import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderItemService {
  private static readonly FULFILL_TRANSACTION_OPTIONS = {
    maxWait: 10_000,
    timeout: 30_000,
  };

  constructor(private prisma: PrismaService) {}

  create(data: CreateOrderItemDto) {
    return this.prisma.orderItem.create({
      data: {
        ...data,
        orderQuantity: data.purchasedQuantity,
      },
    });
  }

  findAll() {
    return this.prisma.orderItem.findMany({
      include: {
        productVariant: true,
        productVariantPrice: true,
      },
    });
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.orderItem.findMany({
      where: {
        AND: [
          query.purchasedQuantity
            ? { purchasedQuantity: query.purchasedQuantity }
            : {},
          query.isApproved ? { isApproved: query.isApproved } : {},
          query.approvedByIds
            ? { approvedById: { in: query.approvedByIds } }
            : {},
          query.approvedStartDate
            ? { approvedAt: { gte: query.approvedStartDate } }
            : {},
          query.approvedEndDate
            ? { approvedAt: { lte: query.approvedEndDate } }
            : {},
          query.productVariantIds
            ? { productVariantId: { in: query.productVariantIds } }
            : {},
          query.productVariantPriceIds
            ? { productVariantPriceId: { in: query.productVariantPriceIds } }
            : {},
          query.orderIds ? { orderId: { in: query.orderIds } } : {},
          query.price ? { price: query.price } : {},
          query.currency ? { currency: query.currency } : {},
          query.isPartiallyFulfilled
            ? { isPartiallyFulfilled: query.isPartiallyFulfilled }
            : {},
          query.fulfilledQuantity
            ? { fulfilledQuantity: query.fulfilledQuantity }
            : {},
          query.isFullyFulfilled
            ? { isFullyFulfilled: query.isFullyFulfilled }
            : {},
          query.ids ? { id: { in: query.ids } } : {},
          query.enabledByIds ? { enabledById: query.enabledByIds } : {},
          query.disabledByIds ? { disabledById: query.disabledByIds } : {},
          query.isEnabled ? { isEnabled: query.isEnabled } : {},
          query.enabledStartDate
            ? { createdAt: { gte: query.enabledStartDate } }
            : {},
          query.enabledEndDate
            ? { createdAt: { lte: query.enabledEndDate } }
            : {},
          query.disabledStartDate
            ? { disabledDate: { gte: query.disabledStartDate } }
            : {},
          query.disabledEndDate
            ? { disabledDate: { lte: query.disabledEndDate } }
            : {},
        ],
      },
      include: {
        productVariant: {
          include: {
            product: true,
            ProductVariantAttribute: true,
          },
        },
        productVariantPrice: true,
        // order: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.orderItem.findUnique({ where: { id } });
  }

  async fulfill(fulfillmentData: any) {
    if (!Array.isArray(fulfillmentData?.orderFulfillment)) {
      throw new BadRequestException('orderFulfillment must be an array');
    }

    const orderFulfillment = fulfillmentData.orderFulfillment.filter(
      (item: any) => item.fulfilledQuantity > 0,
    );

    if (orderFulfillment.length === 0) {
      throw new BadRequestException('No fulfillment items were provided');
    }

    const orderId = fulfillmentData.orderId;
    const enabledById = fulfillmentData.enabledById;

    if (!enabledById) {
      throw new BadRequestException('enabledById is required for fulfillment');
    }

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        select: { id: true, isFullyApproved: true },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      if (!order.isFullyApproved) {
        throw new BadRequestException(
          'Order must be approved before fulfillment',
        );
      }

      const orderItemIds = Array.from(
        new Set<string>(orderFulfillment.map((item: any) => item.orderItemId)),
      );
      const stockIds = Array.from(
        new Set<string>(orderFulfillment.map((item: any) => item.stockId)),
      );

      const [orderItems, stocks] = await Promise.all([
        tx.orderItem.findMany({
          where: {
            id: { in: orderItemIds },
            orderId,
          },
          select: {
            id: true,
            isApproved: true,
            purchasedQuantity: true,
            fulfilledQuantity: true,
          },
        }),
        tx.stock.findMany({
          where: {
            id: { in: stockIds },
          },
          select: {
            id: true,
            remainingUnits: true,
          },
        }),
      ]);

      if (orderItems.length !== orderItemIds.length) {
        throw new NotFoundException('One or more order items were not found');
      }

      if (stocks.length !== stockIds.length) {
        throw new NotFoundException('One or more stock batches were not found');
      }

      const orderItemMap = new Map(orderItems.map((item) => [item.id, item]));
      const stockMap = new Map(stocks.map((stock) => [stock.id, stock]));
      const requestedByOrderItem = new Map<string, number>();
      const requestedByStock = new Map<string, number>();

      for (const item of orderFulfillment) {
        requestedByOrderItem.set(
          item.orderItemId,
          (requestedByOrderItem.get(item.orderItemId) ?? 0) +
            item.fulfilledQuantity,
        );

        requestedByStock.set(
          item.stockId,
          (requestedByStock.get(item.stockId) ?? 0) + item.fulfilledQuantity,
        );
      }

      for (const [orderItemId, requestedQuantity] of requestedByOrderItem) {
        const orderItem = orderItemMap.get(orderItemId);

        if (!orderItem) {
          throw new NotFoundException(
            `Order item ${orderItemId} was not found`,
          );
        }

        if (!orderItem.isApproved) {
          throw new BadRequestException(
            `Order item ${orderItemId} must be approved before fulfillment`,
          );
        }

        if (
          orderItem.fulfilledQuantity + requestedQuantity >
          orderItem.purchasedQuantity
        ) {
          throw new BadRequestException(
            'Fulfilled quantity cannot exceed purchased quantity',
          );
        }
      }

      for (const [stockId, requestedQuantity] of requestedByStock) {
        const stock = stockMap.get(stockId);

        if (!stock) {
          throw new NotFoundException(`Stock ${stockId} was not found`);
        }

        if (stock.remainingUnits < requestedQuantity) {
          throw new BadRequestException(
            'Quantity to fulfill is greater than remaining units',
          );
        }
      }

      await tx.orderItemFulfillment.createMany({
        data: orderFulfillment,
      });

      for (const [orderItemId, requestedQuantity] of requestedByOrderItem) {
        const orderItem = orderItemMap.get(orderItemId)!;
        const nextFulfilledQuantity =
          orderItem.fulfilledQuantity + requestedQuantity;

        await tx.orderItem.update({
          where: { id: orderItemId },
          data: {
            fulfilledQuantity: nextFulfilledQuantity,
            isPartiallyFulfilled: nextFulfilledQuantity > 0,
            isFullyFulfilled:
              nextFulfilledQuantity >= orderItem.purchasedQuantity,
          },
        });
      }

      for (const [stockId, requestedQuantity] of requestedByStock) {
        await tx.stock.update({
          where: { id: stockId },
          data: {
            remainingUnits: {
              decrement: requestedQuantity,
            },
          },
        });
      }

      await tx.stockTransactionItem.createMany({
        data: Array.from(requestedByStock.entries()).map(
          ([stockId, requestedQuantity]) => ({
            stockId,
            quantity: -requestedQuantity,
            enabledById,
          }),
        ),
      });

      const refreshedOrderItems = await tx.orderItem.findMany({
        where: { orderId },
        select: {
          isPartiallyFulfilled: true,
          isFullyFulfilled: true,
        },
      });

      const isFullyFulfilled = refreshedOrderItems.every(
        (item) => item.isFullyFulfilled,
      );
      const isPartiallyFulfilled = refreshedOrderItems.some(
        (item) => item.isPartiallyFulfilled,
      );

      return tx.order.update({
        where: { id: orderId },
        data: {
          isPartiallyFulfilled,
          isFullyFulfilled,
          lastFulfilledDate: new Date(),
          status: isFullyFulfilled ? 'PENDING_SHIPMENT' : 'PARTIALLY_FULFILLED',
        },
      });
    }, OrderItemService.FULFILL_TRANSACTION_OPTIONS);
  }

  update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return this.prisma.orderItem.update({
      where: { id },
      data: updateOrderItemDto,
    });
  }

  enable(id: string) {
    return this.prisma.orderItem.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.orderItem.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.orderItem.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

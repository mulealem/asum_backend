import { Injectable } from '@nestjs/common';
import { CreateOrderItemFulfillmentDto } from './dto/create-order-item-fulfillment.dto';
import { UpdateOrderItemFulfillmentDto } from './dto/update-order-item-fulfillment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderItemFulfillmentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateOrderItemFulfillmentDto) {
    return this.prisma.orderItemFulfillment.create({
      data,
    });
  }

  findAll() {
    return this.prisma.orderItemFulfillment.findMany({
      include: {
        stock: {
          include: {
            productVariant: {
              include: {
                product: true,
                ProductVariantAttribute: true,
                ProductVariantPrice: true,
              },
            },
            location: true,
            // supplier: true,
            // stockSource: true,
          },
        },
        orderItem: {
          include: {
            order: {
              include: {
                customer: true,
              },
            },
          },
        },
      },
    });
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.orderItemFulfillment.findMany({
      where: {
        AND: [
          query.orderItemIds ? { orderItemId: { in: query.orderItemIds } } : {},
          query.stockIds ? { stockId: { in: query.stockIds } } : {},
          query.locationIds
            ? { stock: { locationId: { in: query.locationIds } } }
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
        stock: {
          include: {
            productVariant: {
              include: {
                product: true,
                ProductVariantAttribute: true,
                ProductVariantPrice: true,
              },
            },
            location: true,
            supplier: true,
            stockSource: true,
          },
        },
        orderItem: {
          include: {
            order: {
              include: {
                customer: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.orderItemFulfillment.findUnique({
      where: { id },
      include: {
        stock: {
          include: {
            productVariant: {
              include: {
                product: true,
                ProductVariantAttribute: true,
                ProductVariantPrice: true,
              },
            },
            location: true,
            supplier: true,
            stockSource: true,
          },
        },
        orderItem: {
          include: {
            order: {
              include: {
                customer: true,
              },
            },
          },
        },
      },
    });
  }

  update(
    id: string,
    updateOrderItemFulfillmentDto: UpdateOrderItemFulfillmentDto,
  ) {
    return this.prisma.orderItemFulfillment.update({
      where: { id },
      data: updateOrderItemFulfillmentDto,
    });
  }

  enable(id: string) {
    return this.prisma.orderItemFulfillment.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.orderItemFulfillment.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.orderItemFulfillment.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

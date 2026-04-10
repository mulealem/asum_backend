import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateShipmentItemDto } from './dto/create-shipment-item.dto';
import { UpdateShipmentItemDto } from './dto/update-shipment-item.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShipmentItemService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateShipmentItemDto) {
    return this.prisma.$transaction(async (tx) => {
      await this.validateShipmentItemQuantities(tx, [data]);

      return tx.shipmentItem.create({
        data,
      });
    });
  }

  createMany(data: CreateShipmentItemDto[]) {
    return this.prisma.$transaction(async (tx) => {
      await this.validateShipmentItemQuantities(tx, data);

      return tx.shipmentItem.createMany({
        data,
      });
    });
  }

  private async validateShipmentItemQuantities(
    tx: Prisma.TransactionClient,
    shipmentItems: CreateShipmentItemDto[],
  ) {
    if (shipmentItems.length === 0) {
      throw new BadRequestException('At least one shipment item is required');
    }

    // Only validate fulfillment-based items (order shipments)
    const fulfillmentItems = shipmentItems.filter(
      (item) => item.orderItemFulfillmentId,
    );
    if (fulfillmentItems.length === 0) return;

    const fulfillmentIds = Array.from(
      new Set(fulfillmentItems.map((item) => item.orderItemFulfillmentId!)),
    );

    const fulfillments = await tx.orderItemFulfillment.findMany({
      where: {
        id: { in: fulfillmentIds },
        isEnabled: true,
      },
      select: {
        id: true,
        fulfilledQuantity: true,
        shippedQuantity: true,
      },
    });

    if (fulfillments.length !== fulfillmentIds.length) {
      throw new NotFoundException(
        'One or more order item fulfillment records were not found',
      );
    }

    const existingShipmentItems = await tx.shipmentItem.findMany({
      where: {
        isEnabled: true,
        orderItemFulfillmentId: { in: fulfillmentIds },
        shipment: {
          isShipmentCompleted: false,
          isEnabled: true,
        },
      },
      select: {
        orderItemFulfillmentId: true,
        quantity: true,
      },
    });

    const requestedByFulfillment = new Map<string, number>();
    const alreadyAllocatedByFulfillment = new Map<string, number>();

    for (const item of fulfillmentItems) {
      if (!item.quantity || item.quantity <= 0) {
        throw new BadRequestException(
          'Shipment item quantity must be greater than 0',
        );
      }

      requestedByFulfillment.set(
        item.orderItemFulfillmentId!,
        (requestedByFulfillment.get(item.orderItemFulfillmentId!) ?? 0) +
          item.quantity,
      );
    }

    for (const existing of existingShipmentItems) {
      if (!existing.orderItemFulfillmentId) {
        continue;
      }

      alreadyAllocatedByFulfillment.set(
        existing.orderItemFulfillmentId,
        (alreadyAllocatedByFulfillment.get(existing.orderItemFulfillmentId) ??
          0) + existing.quantity,
      );
    }

    const fulfillmentMap = new Map(fulfillments.map((f) => [f.id, f]));

    for (const [fulfillmentId, requestedQuantity] of requestedByFulfillment) {
      const fulfillment = fulfillmentMap.get(fulfillmentId);

      if (!fulfillment) {
        throw new NotFoundException(
          `Order item fulfillment ${fulfillmentId} was not found`,
        );
      }

      const availableToShip =
        fulfillment.fulfilledQuantity -
        fulfillment.shippedQuantity -
        (alreadyAllocatedByFulfillment.get(fulfillmentId) ?? 0);

      if (requestedQuantity > availableToShip) {
        throw new BadRequestException(
          `Shipment quantity for fulfillment ${fulfillmentId} exceeds available quantity`,
        );
      }
    }
  }

  findAll() {
    return this.prisma.shipmentItem.findMany({
      include: {
        orderItemFulfillment: {
          include: {
            orderItem: {
              include: {
                order: {
                  include: {
                    customer: true,
                  },
                },
              },
            },
            stock: {
              include: {
                productVariant: {
                  include: {
                    product: true,
                    ProductVariantAttribute: true,
                    ProductVariantPrice: true,
                  },
                },
              },
            },
          },
        },
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
          },
        },
        shipment: true,
        ShipmentItemStatus: true,
      },
    });
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.shipmentItem.findMany({
      where: {
        AND: [
          query.shipmentIds ? { shipmentId: { in: query.shipmentIds } } : {},
          query.orderItemFulfillmentIds
            ? { orderItemFulfillmentId: { in: query.orderItemFulfillmentIds } }
            : {},
          query.stockIds ? { stockId: { in: query.stockIds } } : {},

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
        orderItemFulfillment: {
          include: {
            orderItem: {
              include: {
                order: {
                  include: {
                    customer: true,
                  },
                },
              },
            },
            stock: {
              include: {
                productVariant: {
                  include: {
                    product: true,
                    ProductVariantAttribute: true,
                    ProductVariantPrice: true,
                  },
                },
              },
            },
          },
        },
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
          },
        },
        shipment: true,
        ShipmentItemStatus: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.shipmentItem.findUnique({
      where: { id },
      include: {
        orderItemFulfillment: {
          include: {
            orderItem: {
              include: {
                order: true,
              },
            },
            stock: {
              include: {
                productVariant: {
                  include: {
                    product: true,
                    ProductVariantAttribute: true,
                    ProductVariantPrice: true,
                  },
                },
              },
            },
          },
        },
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
          },
        },
        shipment: true,
        ShipmentItemStatus: true,
      },
    });
  }

  update(id: string, updateShipmentItemDto: UpdateShipmentItemDto) {
    return this.prisma.shipmentItem.update({
      where: { id },
      data: updateShipmentItemDto,
    });
  }

  enable(id: string) {
    return this.prisma.shipmentItem.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.shipmentItem.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.shipmentItem.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePurchaseRequestItemDto } from './dto/create-purchase-request-item.dto';
import { UpdatePurchaseRequestItemDto } from './dto/update-purchase-request-item.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PurchaseRequestItemService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePurchaseRequestItemDto) {
    return this.prisma.purchaseRequestItem.create({ data });
  }

  findAll() {
    return this.prisma.purchaseRequestItem.findMany({
      include: {
        productVariant: true,
        purchaseRequest: true,
      },
    });
  }

  filter(query: any) {
    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.purchaseRequestItem.findMany({
      where: {
        AND: [
          query.ids ? { id: { in: query.ids } } : {},
          query.purchaseRequestIds
            ? { purchaseRequestId: { in: query.purchaseRequestIds } }
            : {},
          query.productVariantIds
            ? { productVariantId: { in: query.productVariantIds } }
            : {},
          query.isEnabled !== undefined ? { isEnabled: query.isEnabled } : {},
          query.enabledByIds ? { enabledById: { in: query.enabledByIds } } : {},
          query.disabledByIds
            ? { disabledById: { in: query.disabledByIds } }
            : {},
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
        productVariant: true,
        purchaseRequest: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.purchaseRequestItem.findUnique({
      where: { id },
      include: {
        productVariant: true,
        purchaseRequest: true,
      },
    });
  }

  update(id: string, data: UpdatePurchaseRequestItemDto) {
    return this.prisma.purchaseRequestItem.update({
      where: { id },
      data,
    });
  }

  receiveItem(id: string, receivedQuantity: number) {
    return this.prisma.purchaseRequestItem.update({
      where: { id },
      data: { receivedQuantity },
    });
  }

  enable(id: string) {
    return this.prisma.purchaseRequestItem.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.purchaseRequestItem.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.purchaseRequestItem.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

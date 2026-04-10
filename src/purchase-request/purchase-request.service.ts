import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { PrismaService } from '../prisma.service';
import { PurchaseRequestStatus } from '@prisma/client';

@Injectable()
export class PurchaseRequestService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePurchaseRequestDto) {
    const { items, ...rest } = data as any;

    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe('SELECT pg_advisory_xact_lock(777003)');

      let purchaseRequestNumber = 0;
      const last = await tx.purchaseRequest.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      if (last) {
        purchaseRequestNumber = last.purchaseRequestNumber + 1;
      }

      const pr = await tx.purchaseRequest.create({
        data: {
          supplier: { connect: { id: rest.supplierId } },
          remark: rest.remark,
          expectedDeliveryDate: rest.expectedDeliveryDate,
          status: rest.status,
          enabledBy: rest.enabledById
            ? { connect: { id: rest.enabledById } }
            : undefined,
          purchaseRequestNumber,
        },
      });

      const prItems = await Promise.all(
        items.map((item: any) =>
          tx.purchaseRequestItem.create({
            data: {
              purchaseRequest: { connect: { id: pr.id } },
              productVariant: { connect: { id: item.productVariantId } },
              requestedQuantity: item.requestedQuantity,
              expectedUnitPrice: item.expectedUnitPrice,
              currency: item.currency,
              remark: item.remark,
              enabledBy: rest.enabledById
                ? { connect: { id: rest.enabledById } }
                : undefined,
            },
          }),
        ),
      );

      return { ...pr, PurchaseRequestItem: prItems };
    });
  }

  findAll() {
    return this.prisma.purchaseRequest.findMany({
      include: {
        supplier: true,
        PurchaseRequestItem: {
          include: { productVariant: true },
        },
        enabledBy: true,
        approvedBy: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  filter(query: any) {
    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.purchaseRequest.findMany({
      where: {
        AND: [
          query.ids ? { id: { in: query.ids } } : {},
          query.supplierIds ? { supplierId: { in: query.supplierIds } } : {},
          query.status ? { status: query.status } : {},
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
          query.purchaseRequestNumber
            ? { purchaseRequestNumber: query.purchaseRequestNumber }
            : {},
        ],
      },
      include: {
        supplier: true,
        PurchaseRequestItem: {
          include: { productVariant: true },
        },
        enabledBy: true,
        approvedBy: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.purchaseRequest.findUnique({
      where: { id },
      include: {
        supplier: true,
        PurchaseRequestItem: {
          include: {
            productVariant: {
              include: { product: true, brand: true },
            },
          },
        },
        enabledBy: true,
        approvedBy: true,
      },
    });
  }

  async update(id: string, data: UpdatePurchaseRequestDto) {
    const pr = await this.prisma.purchaseRequest.findUnique({
      where: { id },
    });
    if (!pr) throw new BadRequestException('Purchase request not found');
    if (pr.status !== PurchaseRequestStatus.DRAFT) {
      throw new BadRequestException(
        'Only draft purchase requests can be updated',
      );
    }
    return this.prisma.purchaseRequest.update({
      where: { id },
      data,
    });
  }

  async submit(id: string) {
    const pr = await this.prisma.purchaseRequest.findUnique({
      where: { id },
    });
    if (!pr) throw new BadRequestException('Purchase request not found');
    if (pr.status !== PurchaseRequestStatus.DRAFT) {
      throw new BadRequestException(
        'Only draft purchase requests can be submitted',
      );
    }
    return this.prisma.purchaseRequest.update({
      where: { id },
      data: { status: PurchaseRequestStatus.PENDING_APPROVAL },
    });
  }

  async approve(id: string, approvedById: string) {
    const pr = await this.prisma.purchaseRequest.findUnique({
      where: { id },
    });
    if (!pr) throw new BadRequestException('Purchase request not found');
    if (pr.status !== PurchaseRequestStatus.PENDING_APPROVAL) {
      throw new BadRequestException(
        'Only pending approval requests can be approved',
      );
    }
    return this.prisma.purchaseRequest.update({
      where: { id },
      data: {
        status: PurchaseRequestStatus.APPROVED,
        approvedById,
        approvedDate: new Date(),
      },
    });
  }

  async reject(id: string, approvedById: string) {
    const pr = await this.prisma.purchaseRequest.findUnique({
      where: { id },
    });
    if (!pr) throw new BadRequestException('Purchase request not found');
    if (pr.status !== PurchaseRequestStatus.PENDING_APPROVAL) {
      throw new BadRequestException(
        'Only pending approval requests can be rejected',
      );
    }
    return this.prisma.purchaseRequest.update({
      where: { id },
      data: {
        status: PurchaseRequestStatus.REJECTED,
        approvedById,
        approvedDate: new Date(),
      },
    });
  }

  async markOrdered(id: string) {
    const pr = await this.prisma.purchaseRequest.findUnique({
      where: { id },
    });
    if (!pr) throw new BadRequestException('Purchase request not found');
    if (pr.status !== PurchaseRequestStatus.APPROVED) {
      throw new BadRequestException(
        'Only approved requests can be marked as ordered',
      );
    }
    return this.prisma.purchaseRequest.update({
      where: { id },
      data: {
        status: PurchaseRequestStatus.ORDERED,
        orderedDate: new Date(),
      },
    });
  }

  async receive(id: string) {
    const pr = await this.prisma.purchaseRequest.findUnique({
      where: { id },
      include: { PurchaseRequestItem: true },
    });
    if (!pr) throw new BadRequestException('Purchase request not found');
    if (
      pr.status !== PurchaseRequestStatus.ORDERED &&
      pr.status !== PurchaseRequestStatus.PARTIALLY_RECEIVED
    ) {
      throw new BadRequestException(
        'Only ordered or partially received requests can be received',
      );
    }

    const allFullyReceived = pr.PurchaseRequestItem.every(
      (item) => item.receivedQuantity >= item.requestedQuantity,
    );

    return this.prisma.purchaseRequest.update({
      where: { id },
      data: {
        status: allFullyReceived
          ? PurchaseRequestStatus.RECEIVED
          : PurchaseRequestStatus.PARTIALLY_RECEIVED,
        receivedDate: allFullyReceived ? new Date() : undefined,
      },
    });
  }

  async cancel(id: string) {
    const pr = await this.prisma.purchaseRequest.findUnique({
      where: { id },
    });
    if (!pr) throw new BadRequestException('Purchase request not found');
    if (
      pr.status === PurchaseRequestStatus.RECEIVED ||
      pr.status === PurchaseRequestStatus.CANCELLED
    ) {
      throw new BadRequestException('Cannot cancel this purchase request');
    }
    return this.prisma.purchaseRequest.update({
      where: { id },
      data: { status: PurchaseRequestStatus.CANCELLED },
    });
  }

  enable(id: string) {
    return this.prisma.purchaseRequest.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.purchaseRequest.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.purchaseRequest.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

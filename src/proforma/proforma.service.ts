import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProformaDto } from './dto/create-proforma.dto';
import { UpdateProformaDto } from './dto/update-proforma.dto';
import { PrismaService } from '../prisma.service';
import { ProformaStatus } from '@prisma/client';

@Injectable()
export class ProformaService {
  constructor(private prisma: PrismaService) {}

  private readonly defaultInclude = {
    customer: true,
    ProformaItem: {
      include: {
        productVariant: {
          include: {
            product: true,
            ProductVariantPrice: true,
          },
        },
      },
    },
  };

  async create(data: CreateProformaDto, enabledById: string) {
    const { items, ...rest } = data;

    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe('SELECT pg_advisory_xact_lock(777005)');

      let proformaNumber = 1;
      const last = await tx.proforma.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      if (last) {
        proformaNumber = last.proformaNumber + 1;
      }

      const proforma = await tx.proforma.create({
        data: {
          proformaTo: rest.proformaTo,
          date: rest.date ?? new Date(),
          vatRate: rest.vatRate ?? 0,
          withholdingRate: rest.withholdingRate ?? 0,
          remark: rest.remark,
          proformaNumber,
          ...(rest.customerId && {
            customer: { connect: { id: rest.customerId } },
          }),
          enabledBy: { connect: { id: enabledById } },
        },
      });

      const proformaItems = await Promise.all(
        items.map((item) =>
          tx.proformaItem.create({
            data: {
              proforma: { connect: { id: proforma.id } },
              productVariant: { connect: { id: item.productVariantId } },
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              currency: item.currency ?? 'ETB',
              remark: item.remark,
              enabledBy: { connect: { id: enabledById } },
            },
          }),
        ),
      );

      return { ...proforma, ProformaItem: proformaItems };
    });
  }

  findAll() {
    return this.prisma.proforma.findMany({
      include: this.defaultInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  filter(query: any) {
    return this.prisma.proforma.findMany({
      where: {
        AND: [
          query.ids ? { id: { in: query.ids } } : {},
          query.proformaTo
            ? {
                proformaTo: { contains: query.proformaTo, mode: 'insensitive' },
              }
            : {},
          query.status ? { status: query.status } : {},
          query.customerId ? { customerId: query.customerId } : {},
          query.isEnabled !== undefined ? { isEnabled: query.isEnabled } : {},
          query.enabledByIds ? { enabledById: { in: query.enabledByIds } } : {},
          query.enabledStartDate
            ? { createdAt: { gte: query.enabledStartDate } }
            : {},
          query.enabledEndDate
            ? { createdAt: { lte: query.enabledEndDate } }
            : {},
        ],
      },
      include: this.defaultInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.proforma.findUnique({
      where: { id },
      include: this.defaultInclude,
    });
  }

  update(id: string, data: UpdateProformaDto) {
    return this.prisma.proforma.update({
      where: { id },
      data,
      include: this.defaultInclude,
    });
  }

  async send(id: string) {
    return this.prisma.proforma.update({
      where: { id },
      data: { status: ProformaStatus.SENT },
    });
  }

  async cancel(id: string) {
    return this.prisma.proforma.update({
      where: { id },
      data: { status: ProformaStatus.CANCELLED },
    });
  }

  async getConvertData(id: string) {
    const proforma = await this.prisma.proforma.findUnique({
      where: { id },
      include: {
        customer: true,
        ProformaItem: {
          include: {
            productVariant: {
              include: {
                product: true,
                ProductVariantPrice: { where: { isEnabled: true } },
              },
            },
          },
        },
      },
    });

    if (!proforma) {
      throw new NotFoundException('Proforma not found');
    }

    return proforma;
  }

  async markConverted(id: string, orderId: string) {
    return this.prisma.proforma.update({
      where: { id },
      data: {
        status: ProformaStatus.CONVERTED,
        convertedToOrderId: orderId,
      },
    });
  }

  enable(id: string) {
    return this.prisma.proforma.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.proforma.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.proforma.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

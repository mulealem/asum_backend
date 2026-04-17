import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockAdjustmentDto } from './dto/create-stock-adjustment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StockAdjustmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStockAdjustmentDto) {
    if (!data.enabledById) {
      throw new BadRequestException(
        'enabledById is required for stock adjustment operations',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.findUnique({
        where: { id: data.stockId },
        select: { id: true, remainingUnits: true },
      });

      if (!stock) {
        throw new NotFoundException('Stock batch not found');
      }

      if (stock.remainingUnits < data.quantity) {
        throw new BadRequestException(
          'Adjustment quantity cannot exceed remaining stock units',
        );
      }

      const adjustment = await tx.stockAdjustment.create({ data });

      await tx.stock.update({
        where: { id: data.stockId },
        data: {
          remainingUnits: {
            decrement: data.quantity,
          },
        },
      });

      await tx.stockTransactionItem.create({
        data: {
          stockId: data.stockId,
          quantity: -data.quantity,
          enabledById: data.enabledById,
        },
      });

      return adjustment;
    });
  }

  findAll() {
    return this.prisma.stockAdjustment.findMany({
      include: {
        stock: { include: { productVariant: { include: { product: true } } } },
        adjustReason: true,
      },
    });
  }

  filter(query: any) {
    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.stockAdjustment.findMany({
      where: {
        AND: [
          query.stockIds ? { stockId: { in: query.stockIds } } : {},
          query.adjustReasonIds
            ? { adjustReasonId: { in: query.adjustReasonIds } }
            : {},
          query.ids ? { id: { in: query.ids } } : {},
          query.enabledByIds ? { enabledById: { in: query.enabledByIds } } : {},
          query.disabledByIds
            ? { disabledById: { in: query.disabledByIds } }
            : {},
          query.isEnabled !== undefined ? { isEnabled: query.isEnabled } : {},
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
        stock: { include: { productVariant: { include: { product: true } } } },
        adjustReason: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.stockAdjustment.findUnique({
      where: { id },
      include: {
        stock: { include: { productVariant: { include: { product: true } } } },
        adjustReason: true,
      },
    });
  }

  enable(id: string) {
    return this.prisma.stockAdjustment.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.stockAdjustment.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.stockAdjustment.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

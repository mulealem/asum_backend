import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiscardedStockDto } from './dto/create-discarded-stock.dto';
import { UpdateDiscardedStockDto } from './dto/update-discarded-stock.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DiscardedStockService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDiscardedStockDto) {
    if (!data.enabledById) {
      throw new BadRequestException(
        'enabledById is required for stock discard operations',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.findUnique({
        where: { id: data.stockId },
        select: {
          id: true,
          remainingUnits: true,
        },
      });

      if (!stock) {
        throw new NotFoundException('Stock batch not found');
      }

      if (stock.remainingUnits < data.quantity) {
        throw new BadRequestException(
          'Discard quantity cannot exceed remaining stock units',
        );
      }

      const discardedStock = await tx.discardedStock.create({ data });

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

      return discardedStock;
    });
  }

  findAll() {
    return this.prisma.discardedStock.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.discardedStock.findMany({
      where: {
        AND: [
          query.stockIds ? { stockId: { in: query.stockIds } } : {},
          query.discardedReasonIds
            ? { discardedReasonId: { in: query.discardedReasonIds } }
            : {},
          query.quantity ? { quantity: query.quantity } : {},
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
    });
  }

  findOne(id: string) {
    return this.prisma.discardedStock.findUnique({ where: { id } });
  }

  update(id: string, updateDiscardedStockDto: UpdateDiscardedStockDto) {
    return this.prisma.discardedStock.update({
      where: { id },
      data: updateDiscardedStockDto,
    });
  }

  enable(id: string) {
    return this.prisma.discardedStock.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.discardedStock.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.discardedStock.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateStockAdjustReasonDto } from './dto/create-stock-adjust-reason.dto';
import { UpdateStockAdjustReasonDto } from './dto/update-stock-adjust-reason.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StockAdjustReasonService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateStockAdjustReasonDto) {
    return this.prisma.stockAdjustReason.create({ data });
  }

  findAll() {
    return this.prisma.stockAdjustReason.findMany({});
  }

  filter(query: any) {
    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.stockAdjustReason.findMany({
      where: {
        AND: [
          query.title ? { title: query.title } : {},
          query.abbreviation ? { abbreviation: query.abbreviation } : {},
          query.ids ? { id: { in: query.ids } } : {},
          query.enabledByIds ? { enabledById: query.enabledByIds } : {},
          query.disabledByIds ? { disabledById: query.disabledByIds } : {},
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
    });
  }

  findOne(id: string) {
    return this.prisma.stockAdjustReason.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateStockAdjustReasonDto) {
    return this.prisma.stockAdjustReason.update({ where: { id }, data });
  }

  enable(id: string) {
    return this.prisma.stockAdjustReason.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.stockAdjustReason.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.stockAdjustReason.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

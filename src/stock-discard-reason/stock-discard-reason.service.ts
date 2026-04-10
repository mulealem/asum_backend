import { Injectable } from '@nestjs/common';
import { CreateStockDiscardReasonDto } from './dto/create-stock-discard-reason.dto';
import { UpdateStockDiscardReasonDto } from './dto/update-stock-discard-reason.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StockDiscardReasonService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateStockDiscardReasonDto) {
    return this.prisma.stockDiscardReason.create({ data });
  }

  findAll() {
    return this.prisma.stockDiscardReason.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.stockDiscardReason.findMany({
      where: {
        AND: [
          query.title ? { title: query.title } : {},
          query.abbreviation ? { abbreviation: query.abbreviation } : {},
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
    return this.prisma.stockDiscardReason.findUnique({ where: { id } });
  }

  update(id: string, updateStockDiscardReasonDto: UpdateStockDiscardReasonDto) {
    return this.prisma.stockDiscardReason.update({
      where: { id },
      data: updateStockDiscardReasonDto,
    });
  }

  enable(id: string) {
    return this.prisma.stockDiscardReason.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.stockDiscardReason.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.stockDiscardReason.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

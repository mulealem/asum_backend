import { Injectable } from '@nestjs/common';
import { CreateStockSourceDto } from './dto/create-stock-source.dto';
import { UpdateStockSourceDto } from './dto/update-stock-source.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StockSourceService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateStockSourceDto) {
    return this.prisma.stockSource.create({ data });
  }

  findAll() {
    return this.prisma.stockSource.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.stockSource.findMany({
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
    return this.prisma.stockSource.findUnique({ where: { id } });
  }

  update(id: string, updateStockSourceDto: UpdateStockSourceDto) {
    return this.prisma.stockSource.update({
      where: { id },
      data: updateStockSourceDto,
    });
  }

  enable(id: string) {
    return this.prisma.stockSource.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.stockSource.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.stockSource.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

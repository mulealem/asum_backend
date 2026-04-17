import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTaxDto) {
    return this.prisma.tax.create({ data: data as any });
  }

  findAll() {
    return this.prisma.tax.findMany({});
  }

  filter(query: any) {
    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.tax.findMany({
      where: {
        AND: [
          query.name
            ? { name: { contains: query.name, mode: 'insensitive' } }
            : {},
          query.abbreviation ? { abbreviation: query.abbreviation } : {},
          query.type ? { type: query.type } : {},
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
    });
  }

  findOne(id: string) {
    return this.prisma.tax.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateTaxDto) {
    return this.prisma.tax.update({ where: { id }, data: data as any });
  }

  enable(id: string) {
    return this.prisma.tax.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.tax.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.tax.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTypeOfProductDto } from './dto/create-type-of-product.dto';
import { UpdateTypeOfProductDto } from './dto/update-type-of-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TypeOfProductService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTypeOfProductDto) {
    return this.prisma.typeOfProduct.create({ data });
  }

  findAll() {
    return this.prisma.typeOfProduct.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.typeOfProduct.findMany({
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
    return this.prisma.typeOfProduct.findUnique({ where: { id } });
  }

  update(id: string, updateTypeOfProductDto: UpdateTypeOfProductDto) {
    return this.prisma.typeOfProduct.update({
      where: { id },
      data: updateTypeOfProductDto,
    });
  }

  enable(id: string) {
    return this.prisma.typeOfProduct.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.typeOfProduct.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.typeOfProduct.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

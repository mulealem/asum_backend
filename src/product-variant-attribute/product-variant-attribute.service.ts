import { Injectable } from '@nestjs/common';
import { CreateProductVariantAttributeDto } from './dto/create-product-variant-attribute.dto';
import { UpdateProductVariantAttributeDto } from './dto/update-product-variant-attribute.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductVariantAttributeService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductVariantAttributeDto) {
    return this.prisma.productVariantAttribute.create({
      data,
    });
  }

  findAll() {
    return this.prisma.productVariantAttribute.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.productVariantAttribute.findMany({
      where: {
        AND: [
          query.productVariantIds
            ? { productVariantId: { in: query.productVariantIds } }
            : {},
          query.key ? { key: { contains: query.key } } : {},
          query.value ? { value: { contains: query.value } } : {},
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
    return this.prisma.productVariantAttribute.findUnique({ where: { id } });
  }

  update(
    id: string,
    updateProductVariantAttributeDto: UpdateProductVariantAttributeDto,
  ) {
    return this.prisma.productVariantAttribute.update({
      where: { id },
      data: updateProductVariantAttributeDto,
    });
  }

  enable(id: string) {
    return this.prisma.productVariantAttribute.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.productVariantAttribute.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.productVariantAttribute.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

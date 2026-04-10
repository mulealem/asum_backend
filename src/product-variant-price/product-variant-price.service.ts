import { Injectable } from '@nestjs/common';
import { CreateProductVariantPriceDto } from './dto/create-product-variant-price.dto';
import { UpdateProductVariantPriceDto } from './dto/update-product-variant-price.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductVariantPriceService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductVariantPriceDto) {
    return this.prisma.productVariantPrice.create({
      data,
    });
  }

  findAll() {
    return this.prisma.productVariantPrice.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.productVariantPrice.findMany({
      where: {
        AND: [
          query.productVariantIds
            ? { productVariantId: { in: query.productVariantIds } }
            : {},
          query.tags ? { tag: { in: query.tags } } : {},
          query.currency ? { currency: { equals: query.currency } } : {},
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
    return this.prisma.productVariantPrice.findUnique({ where: { id } });
  }

  update(
    id: string,
    updateProductVariantPriceDto: UpdateProductVariantPriceDto,
  ) {
    return this.prisma.productVariantPrice.update({
      where: { id },
      data: updateProductVariantPriceDto,
    });
  }

  enable(id: string) {
    return this.prisma.productVariantPrice.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.productVariantPrice.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.productVariantPrice.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

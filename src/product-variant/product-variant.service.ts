import { Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductVariantService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductVariantDto) {
    return this.prisma.productVariant.create({
      data,
    });
  }

  findAll() {
    return this.prisma.productVariant.findMany({
      include: {
        product: true,
        brand: true,
      },
    });
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.productVariant.findMany({
      where: {
        AND: [
          query.productIds ? { productId: { in: query.productIds } } : {},
          query.codes ? { code: { in: query.codes } } : {},
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
      include: {
        product: true,
        brand: true,
        ProductVariantAttribute: true,
        ProductVariantPrice: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        product: true,
        brand: true,
        ProductVariantAttribute: true,
        ProductVariantPrice: true,
      },
    });
  }

  update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
    return this.prisma.productVariant.update({
      where: { id },
      data: updateProductVariantDto,
    });
  }

  enable(id: string) {
    return this.prisma.productVariant.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.productVariant.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.productVariant.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

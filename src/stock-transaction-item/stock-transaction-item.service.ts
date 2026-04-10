import { Injectable } from '@nestjs/common';
import { CreateStockTransactionItemDto } from './dto/create-stock-transaction-item.dto';
import { UpdateStockTransactionItemDto } from './dto/update-stock-transaction-item.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StockTransactionItemService {
  constructor(private prisma: PrismaService) {}

  create(createStockTransactionItemDto: CreateStockTransactionItemDto) {
    return this.prisma.stockTransactionItem.create({
      data: {
        stockId: createStockTransactionItemDto.stockId,
        quantity: createStockTransactionItemDto.quantity,
        enabledById: createStockTransactionItemDto.enabledById!,
      },
    });
  }

  findAll() {
    return this.prisma.stockTransactionItem.findMany({
      include: {
        stock: {
          include: {
            productVariant: {
              include: {
                product: true,
                ProductVariantAttribute: true,
              },
            },
            location: true,
            supplier: true,
          },
        },
        enabledBy: true,
        disabledBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  filter(query: any) {
    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.stockTransactionItem.findMany({
      where: {
        AND: [
          query.ids ? { id: { in: query.ids } } : {},
          query.stockIds ? { stockId: { in: query.stockIds } } : {},
          typeof query.quantity === 'number'
            ? { quantity: query.quantity }
            : {},
          query.enabledByIds ? { enabledById: { in: query.enabledByIds } } : {},
          query.disabledByIds
            ? { disabledById: { in: query.disabledByIds } }
            : {},
          typeof query.isEnabled === 'boolean'
            ? { isEnabled: query.isEnabled }
            : {},
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
        stock: {
          include: {
            productVariant: {
              include: {
                product: true,
                ProductVariantAttribute: true,
              },
            },
            location: true,
            supplier: true,
          },
        },
        enabledBy: true,
        disabledBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.stockTransactionItem.findUnique({
      where: { id },
      include: {
        stock: {
          include: {
            productVariant: {
              include: {
                product: true,
                ProductVariantAttribute: true,
              },
            },
            location: true,
            supplier: true,
          },
        },
        enabledBy: true,
        disabledBy: true,
      },
    });
  }

  update(
    id: string,
    updateStockTransactionItemDto: UpdateStockTransactionItemDto,
  ) {
    return this.prisma.stockTransactionItem.update({
      where: { id },
      data: updateStockTransactionItemDto,
    });
  }

  remove(id: string) {
    return this.prisma.stockTransactionItem.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

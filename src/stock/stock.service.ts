import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStockDto) {
    if (!data.enabledById) {
      throw new BadRequestException('enabledById is required for stock intake');
    }

    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.create({ data });

      if (data.remainingUnits > 0) {
        await tx.stockTransactionItem.create({
          data: {
            stockId: stock.id,
            quantity: data.remainingUnits,
            enabledById: data.enabledById,
          },
        });
      }

      return stock;
    });
  }

  findAll() {
    return this.prisma.stock.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.stock.findMany({
      where: {
        AND: [
          query.productVariantIds
            ? { productVariantId: { in: query.productVariantIds } }
            : {},
          query.supplierIds ? { supplierId: { in: query.supplierIds } } : {},
          query.locationIds ? { locationId: { in: query.locationIds } } : {},
          query.batchIds ? { batchId: { in: query.batchIds } } : {},
          query.totalPurchasedUnits
            ? { totalPurchasedUnits: query.totalPurchasedUnits }
            : {},
          query.remainingUnits ? { remainingUnits: query.remainingUnits } : {},
          query.manufacturedStartDate
            ? { manufacturedDate: { gte: query.manufacturedStartDate } }
            : {},
          query.manufacturedEndDate
            ? { manufacturedDate: { lte: query.manufacturedEndDate } }
            : {},
          query.expirationStartDate
            ? { expirationDate: { gte: query.expirationStartDate } }
            : {},
          query.expirationEndDate
            ? { expirationDate: { lte: query.expirationEndDate } }
            : {},
          query.referenceNumber
            ? { referenceNumber: { contains: query.referenceNumber } }
            : {},
          query.receiptNumber
            ? { receiptNumber: { contains: query.receiptNumber } }
            : {},
          query.stockSourceIds
            ? { stockSourceId: { in: query.stockSourceIds } }
            : {},
          query.transportationFree
            ? { transportationFree: query.transportationFree }
            : {},
          query.taxFee ? { taxFee: query.taxFee } : {},
          query.miscellaneousFee
            ? { miscellaneousFee: query.miscellaneousFee }
            : {},
          query.purchasePrice ? { purchasePrice: query.purchasePrice } : {},
          query.expectedRetailPrice
            ? { expectedRetailPrice: query.expectedRetailPrice }
            : {},
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
        productVariant: {
          include: {
            product: true,
            ProductVariantAttribute: true,
          },
        },
        supplier: true,
        location: true,
        stockSource: true,
      },
    });
  }

  async overview(query: any) {
    const productVariantWithStocks = await this.prisma.productVariant.findMany({
      where: {
        AND: [
          query.productVariantIds
            ? { id: { in: query.productVariantIds } }
            : {},
        ],
      },
      include: {
        product: true,
        ProductVariantAttribute: true,
        Stock: {
          where: {
            AND: [
              query.productVariantIds
                ? { productVariantId: { in: query.productVariantIds } }
                : {},
              query.supplierIds
                ? { supplierId: { in: query.supplierIds } }
                : {},
              query.locationIds
                ? { locationId: { in: query.locationIds } }
                : {},
              query.batchIds ? { batchId: { in: query.batchIds } } : {},
              query.totalPurchasedUnits
                ? { totalPurchasedUnits: query.totalPurchasedUnits }
                : {},
              query.remainingUnits
                ? { remainingUnits: query.remainingUnits }
                : {},
              query.manufacturedStartDate
                ? { manufacturedDate: { gte: query.manufacturedStartDate } }
                : {},
              query.manufacturedEndDate
                ? { manufacturedDate: { lte: query.manufacturedEndDate } }
                : {},
              query.expirationStartDate
                ? { expirationDate: { gte: query.expirationStartDate } }
                : {},
              query.expirationEndDate
                ? { expirationDate: { lte: query.expirationEndDate } }
                : {},
              query.referenceNumber
                ? { referenceNumber: { contains: query.referenceNumber } }
                : {},
              query.receiptNumber
                ? { receiptNumber: { contains: query.receiptNumber } }
                : {},
              query.stockSourceIds
                ? { stockSourceId: { in: query.stockSourceIds } }
                : {},
              query.transportationFree
                ? { transportationFree: query.transportationFree }
                : {},
              query.taxFee ? { taxFee: query.taxFee } : {},
              query.miscellaneousFee
                ? { miscellaneousFee: query.miscellaneousFee }
                : {},
              query.purchasePrice ? { purchasePrice: query.purchasePrice } : {},
              query.expectedRetailPrice
                ? { expectedRetailPrice: query.expectedRetailPrice }
                : {},
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
        },
        OrderItem: {
          where: {
            isFullyFulfilled: false,
            order: {
              isEnabled: true,
              status: {
                notIn: ['DENIED', 'CANCELLED'],
              },
            },
          },
          select: {
            orderId: true,
            purchasedQuantity: true,
            shippedQuantity: true,
            fulfilledQuantity: true,
          },
        },
      },
    });

    // const summaries = data.map((product_variant: any) => {
    //   return {
    //     code: product_variant.code,
    //     title:
    //       product_variant.product.title +
    //       " - " +
    //       product_variant.product_attribute
    //         .reduce((acc: string, curr: any) => {
    //           return acc + curr.key + ": " + curr.value + ", ";
    //         }, "")
    //         .slice(0, -2),
    //     total_remaining_units: product_variant.stock
    //       .map((stock: any) => stock.remaining_units)
    //       .reduce((a: any, b: any) => a + b, 0),
    //   };
    // });

    const summaries = productVariantWithStocks.map(
      (productVariantWithStock: any) => {
        return {
          productVariantId: productVariantWithStock.id,
          code: productVariantWithStock.code,
          title:
            productVariantWithStock.product.title +
            ' - ' +
            productVariantWithStock.ProductVariantAttribute.reduce(
              (acc: string, curr: any) => {
                return acc + curr.key + ': ' + curr.value + ', ';
              },
              '',
            ).slice(0, -2),
          totalRemainingUnits: productVariantWithStock.Stock.map(
            (stock: any) => stock.remainingUnits,
          ).reduce((a: any, b: any) => a + b, 0),
          reservedUnits: productVariantWithStock.OrderItem.map(
            (orderItem: any) =>
              Math.max(
                orderItem.purchasedQuantity - orderItem.fulfilledQuantity,
                0,
              ),
          ).reduce((a: any, b: any) => a + b, 0),
        };
      },
    );

    // console.log('summaries', summaries);

    return summaries;
  }

  async availableStock(typeOfProductId: string, locationId?: string) {
    const productVariantWithStocks = await this.prisma.productVariant.findMany({
      where: {
        product: {
          typeOfProductId,
        },
      },
      include: {
        product: true,
        ProductVariantAttribute: true,
        Stock: {
          where: locationId ? { locationId } : {},
        },
        OrderItem: {
          where: {
            isFullyFulfilled: false,
            order: {
              isEnabled: true,
              status: {
                notIn: ['DENIED', 'CANCELLED'],
              },
            },
          },
          select: {
            orderId: true,
            purchasedQuantity: true,
            shippedQuantity: true,
            fulfilledQuantity: true,
          },
        },
        ProductVariantPrice: true,
      },
    });

    // const summaries = data.map((product_variant: any) => {
    //   return {
    //     code: product_variant.code,
    //     title:
    //       product_variant.product.title +
    //       " - " +
    //       product_variant.product_attribute
    //         .reduce((acc: string, curr: any) => {
    //           return acc + curr.key + ": " + curr.value + ", ";
    //         }, "")
    //         .slice(0, -2),
    //     total_remaining_units: product_variant.stock
    //       .map((stock: any) => stock.remaining_units)
    //       .reduce((a: any, b: any) => a + b, 0),
    //   };
    // });

    const summaries = productVariantWithStocks.map(
      (productVariantWithStock: any) => {
        return {
          id: productVariantWithStock.id,
          code: productVariantWithStock.code,
          title:
            productVariantWithStock.product.title +
            ' - ' +
            productVariantWithStock.ProductVariantAttribute.reduce(
              (acc: string, curr: any) => {
                return acc + curr.key + ': ' + curr.value + ', ';
              },
              '',
            ).slice(0, -2),
          totalRemainingUnits: productVariantWithStock.Stock.map(
            (stock: any) => stock.remainingUnits,
          ).reduce((a: any, b: any) => a + b, 0),
          reservedUnits: productVariantWithStock.OrderItem.map(
            (orderItem: any) =>
              Math.max(
                orderItem.purchasedQuantity - orderItem.fulfilledQuantity,
                0,
              ),
          ).reduce((a: any, b: any) => a + b, 0),
          prices: productVariantWithStock.ProductVariantPrice,
        };
      },
    );

    // console.log('summaries', summaries);

    return summaries;
  }

  async availableStock1(typeOfProductId: string) {
    const productVariantWithStocks = await this.prisma.productVariant.findMany({
      where: {
        product: {
          typeOfProductId,
        },
      },
      include: {
        product: true,
        ProductVariantAttribute: true,
        ProductVariantPrice: true,
        Stock: true,
      },
    });

    const summaries = productVariantWithStocks.map(
      (productVariantWithStock: any) => {
        return {
          id: productVariantWithStock.id,
          code: productVariantWithStock.code,
          title:
            productVariantWithStock.product.title +
            ' - ' +
            productVariantWithStock.ProductVariantAttribute.reduce(
              (acc: string, curr: any) => {
                return acc + curr.key + ': ' + curr.value + ', ';
              },
              '',
            ).slice(0, -2),
          totalRemainingUnits: productVariantWithStock.Stock.map(
            (stock: any) => stock.remainingUnits,
          ).reduce((a: any, b: any) => a + b, 0),
          prices: productVariantWithStock.ProductVariantPrice,
        };
      },
    );

    // console.log('summaries', summaries);

    return summaries
      .filter((summary: any) => summary.totalRemainingUnits > 0)
      .sort((a: any, b: any) => b.totalRemainingUnits - a.totalRemainingUnits);
  }

  findOne(id: string) {
    return this.prisma.stock.findUnique({ where: { id } });
  }

  update(id: string, updateStockDto: UpdateStockDto) {
    return this.prisma.stock.update({
      where: { id },
      data: updateStockDto,
    });
  }

  enable(id: string) {
    return this.prisma.stock.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.stock.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.stock.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

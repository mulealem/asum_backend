"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StockService = class StockService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (!data.enabledById) {
            throw new common_1.BadRequestException('enabledById is required for stock intake');
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
    filter(query) {
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
    async overview(query) {
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
        const summaries = productVariantWithStocks.map((productVariantWithStock) => {
            return {
                productVariantId: productVariantWithStock.id,
                code: productVariantWithStock.code,
                title: productVariantWithStock.product.title +
                    ' - ' +
                    productVariantWithStock.ProductVariantAttribute.reduce((acc, curr) => {
                        return acc + curr.key + ': ' + curr.value + ', ';
                    }, '').slice(0, -2),
                totalRemainingUnits: productVariantWithStock.Stock.map((stock) => stock.remainingUnits).reduce((a, b) => a + b, 0),
                reservedUnits: productVariantWithStock.OrderItem.map((orderItem) => Math.max(orderItem.purchasedQuantity - orderItem.fulfilledQuantity, 0)).reduce((a, b) => a + b, 0),
            };
        });
        return summaries;
    }
    async availableStock(typeOfProductId, locationId) {
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
        const summaries = productVariantWithStocks.map((productVariantWithStock) => {
            return {
                id: productVariantWithStock.id,
                code: productVariantWithStock.code,
                title: productVariantWithStock.product.title +
                    ' - ' +
                    productVariantWithStock.ProductVariantAttribute.reduce((acc, curr) => {
                        return acc + curr.key + ': ' + curr.value + ', ';
                    }, '').slice(0, -2),
                totalRemainingUnits: productVariantWithStock.Stock.map((stock) => stock.remainingUnits).reduce((a, b) => a + b, 0),
                reservedUnits: productVariantWithStock.OrderItem.map((orderItem) => Math.max(orderItem.purchasedQuantity - orderItem.fulfilledQuantity, 0)).reduce((a, b) => a + b, 0),
                prices: productVariantWithStock.ProductVariantPrice,
            };
        });
        return summaries;
    }
    async availableStock1(typeOfProductId) {
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
        const summaries = productVariantWithStocks.map((productVariantWithStock) => {
            return {
                id: productVariantWithStock.id,
                code: productVariantWithStock.code,
                title: productVariantWithStock.product.title +
                    ' - ' +
                    productVariantWithStock.ProductVariantAttribute.reduce((acc, curr) => {
                        return acc + curr.key + ': ' + curr.value + ', ';
                    }, '').slice(0, -2),
                totalRemainingUnits: productVariantWithStock.Stock.map((stock) => stock.remainingUnits).reduce((a, b) => a + b, 0),
                prices: productVariantWithStock.ProductVariantPrice,
            };
        });
        return summaries
            .filter((summary) => summary.totalRemainingUnits > 0)
            .sort((a, b) => b.totalRemainingUnits - a.totalRemainingUnits);
    }
    findOne(id) {
        return this.prisma.stock.findUnique({ where: { id } });
    }
    update(id, updateStockDto) {
        return this.prisma.stock.update({
            where: { id },
            data: updateStockDto,
        });
    }
    enable(id) {
        return this.prisma.stock.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.stock.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.stock.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockService);
//# sourceMappingURL=stock.service.js.map
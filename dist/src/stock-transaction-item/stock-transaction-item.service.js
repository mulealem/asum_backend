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
exports.StockTransactionItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StockTransactionItemService = class StockTransactionItemService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createStockTransactionItemDto) {
        return this.prisma.stockTransactionItem.create({
            data: {
                stockId: createStockTransactionItemDto.stockId,
                quantity: createStockTransactionItemDto.quantity,
                enabledById: createStockTransactionItemDto.enabledById,
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
    filter(query) {
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
    findOne(id) {
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
    update(id, updateStockTransactionItemDto) {
        return this.prisma.stockTransactionItem.update({
            where: { id },
            data: updateStockTransactionItemDto,
        });
    }
    remove(id) {
        return this.prisma.stockTransactionItem.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.StockTransactionItemService = StockTransactionItemService;
exports.StockTransactionItemService = StockTransactionItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockTransactionItemService);
//# sourceMappingURL=stock-transaction-item.service.js.map
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
exports.StockAdjustmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StockAdjustmentService = class StockAdjustmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (!data.enabledById) {
            throw new common_1.BadRequestException('enabledById is required for stock adjustment operations');
        }
        return this.prisma.$transaction(async (tx) => {
            const stock = await tx.stock.findUnique({
                where: { id: data.stockId },
                select: { id: true, remainingUnits: true },
            });
            if (!stock) {
                throw new common_1.NotFoundException('Stock batch not found');
            }
            if (stock.remainingUnits < data.quantity) {
                throw new common_1.BadRequestException('Adjustment quantity cannot exceed remaining stock units');
            }
            const adjustment = await tx.stockAdjustment.create({ data });
            await tx.stock.update({
                where: { id: data.stockId },
                data: {
                    remainingUnits: {
                        decrement: data.quantity,
                    },
                },
            });
            await tx.stockTransactionItem.create({
                data: {
                    stockId: data.stockId,
                    quantity: -data.quantity,
                    enabledById: data.enabledById,
                },
            });
            return adjustment;
        });
    }
    findAll() {
        return this.prisma.stockAdjustment.findMany({
            include: {
                stock: { include: { productVariant: { include: { product: true } } } },
                adjustReason: true,
            },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.stockAdjustment.findMany({
            where: {
                AND: [
                    query.stockIds ? { stockId: { in: query.stockIds } } : {},
                    query.adjustReasonIds
                        ? { adjustReasonId: { in: query.adjustReasonIds } }
                        : {},
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
            include: {
                stock: { include: { productVariant: { include: { product: true } } } },
                adjustReason: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.stockAdjustment.findUnique({
            where: { id },
            include: {
                stock: { include: { productVariant: { include: { product: true } } } },
                adjustReason: true,
            },
        });
    }
    enable(id) {
        return this.prisma.stockAdjustment.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.stockAdjustment.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.stockAdjustment.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.StockAdjustmentService = StockAdjustmentService;
exports.StockAdjustmentService = StockAdjustmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockAdjustmentService);
//# sourceMappingURL=stock-adjustment.service.js.map
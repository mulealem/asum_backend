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
exports.DiscardedStockService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DiscardedStockService = class DiscardedStockService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (!data.enabledById) {
            throw new common_1.BadRequestException('enabledById is required for stock discard operations');
        }
        return this.prisma.$transaction(async (tx) => {
            const stock = await tx.stock.findUnique({
                where: { id: data.stockId },
                select: {
                    id: true,
                    remainingUnits: true,
                },
            });
            if (!stock) {
                throw new common_1.NotFoundException('Stock batch not found');
            }
            if (stock.remainingUnits < data.quantity) {
                throw new common_1.BadRequestException('Discard quantity cannot exceed remaining stock units');
            }
            const discardedStock = await tx.discardedStock.create({ data });
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
            return discardedStock;
        });
    }
    findAll() {
        return this.prisma.discardedStock.findMany({});
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.discardedStock.findMany({
            where: {
                AND: [
                    query.stockIds ? { stockId: { in: query.stockIds } } : {},
                    query.discardedReasonIds
                        ? { discardedReasonId: { in: query.discardedReasonIds } }
                        : {},
                    query.quantity ? { quantity: query.quantity } : {},
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
    findOne(id) {
        return this.prisma.discardedStock.findUnique({ where: { id } });
    }
    update(id, updateDiscardedStockDto) {
        return this.prisma.discardedStock.update({
            where: { id },
            data: updateDiscardedStockDto,
        });
    }
    enable(id) {
        return this.prisma.discardedStock.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.discardedStock.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.discardedStock.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.DiscardedStockService = DiscardedStockService;
exports.DiscardedStockService = DiscardedStockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiscardedStockService);
//# sourceMappingURL=discarded-stock.service.js.map
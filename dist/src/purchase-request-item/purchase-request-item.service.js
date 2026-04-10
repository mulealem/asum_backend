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
exports.PurchaseRequestItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PurchaseRequestItemService = class PurchaseRequestItemService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.purchaseRequestItem.create({ data });
    }
    findAll() {
        return this.prisma.purchaseRequestItem.findMany({
            include: {
                productVariant: true,
                purchaseRequest: true,
            },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.purchaseRequestItem.findMany({
            where: {
                AND: [
                    query.ids ? { id: { in: query.ids } } : {},
                    query.purchaseRequestIds
                        ? { purchaseRequestId: { in: query.purchaseRequestIds } }
                        : {},
                    query.productVariantIds
                        ? { productVariantId: { in: query.productVariantIds } }
                        : {},
                    query.isEnabled !== undefined ? { isEnabled: query.isEnabled } : {},
                    query.enabledByIds ? { enabledById: { in: query.enabledByIds } } : {},
                    query.disabledByIds
                        ? { disabledById: { in: query.disabledByIds } }
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
                productVariant: true,
                purchaseRequest: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.purchaseRequestItem.findUnique({
            where: { id },
            include: {
                productVariant: true,
                purchaseRequest: true,
            },
        });
    }
    update(id, data) {
        return this.prisma.purchaseRequestItem.update({
            where: { id },
            data,
        });
    }
    receiveItem(id, receivedQuantity) {
        return this.prisma.purchaseRequestItem.update({
            where: { id },
            data: { receivedQuantity },
        });
    }
    enable(id) {
        return this.prisma.purchaseRequestItem.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.purchaseRequestItem.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.purchaseRequestItem.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.PurchaseRequestItemService = PurchaseRequestItemService;
exports.PurchaseRequestItemService = PurchaseRequestItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchaseRequestItemService);
//# sourceMappingURL=purchase-request-item.service.js.map
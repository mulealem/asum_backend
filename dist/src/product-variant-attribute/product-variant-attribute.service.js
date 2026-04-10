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
exports.ProductVariantAttributeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductVariantAttributeService = class ProductVariantAttributeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.productVariantAttribute.create({
            data,
        });
    }
    findAll() {
        return this.prisma.productVariantAttribute.findMany({});
    }
    filter(query) {
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
    findOne(id) {
        return this.prisma.productVariantAttribute.findUnique({ where: { id } });
    }
    update(id, updateProductVariantAttributeDto) {
        return this.prisma.productVariantAttribute.update({
            where: { id },
            data: updateProductVariantAttributeDto,
        });
    }
    enable(id) {
        return this.prisma.productVariantAttribute.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.productVariantAttribute.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.productVariantAttribute.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.ProductVariantAttributeService = ProductVariantAttributeService;
exports.ProductVariantAttributeService = ProductVariantAttributeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductVariantAttributeService);
//# sourceMappingURL=product-variant-attribute.service.js.map
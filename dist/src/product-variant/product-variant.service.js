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
exports.ProductVariantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductVariantService = class ProductVariantService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
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
    filter(query) {
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
    findOne(id) {
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
    update(id, updateProductVariantDto) {
        return this.prisma.productVariant.update({
            where: { id },
            data: updateProductVariantDto,
        });
    }
    enable(id) {
        return this.prisma.productVariant.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.productVariant.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.productVariant.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.ProductVariantService = ProductVariantService;
exports.ProductVariantService = ProductVariantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductVariantService);
//# sourceMappingURL=product-variant.service.js.map
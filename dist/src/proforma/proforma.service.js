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
exports.ProformaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let ProformaService = class ProformaService {
    constructor(prisma) {
        this.prisma = prisma;
        this.defaultInclude = {
            customer: true,
            ProformaItem: {
                include: {
                    productVariant: {
                        include: {
                            product: true,
                            ProductVariantPrice: true,
                        },
                    },
                },
            },
        };
    }
    async create(data, enabledById) {
        const { items, ...rest } = data;
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe('SELECT pg_advisory_xact_lock(777005)');
            let proformaNumber = 1;
            const last = await tx.proforma.findFirst({
                orderBy: { createdAt: 'desc' },
            });
            if (last) {
                proformaNumber = last.proformaNumber + 1;
            }
            const proforma = await tx.proforma.create({
                data: {
                    proformaTo: rest.proformaTo,
                    date: rest.date ?? new Date(),
                    vatRate: rest.vatRate ?? 0,
                    withholdingRate: rest.withholdingRate ?? 0,
                    remark: rest.remark,
                    proformaNumber,
                    ...(rest.customerId && {
                        customer: { connect: { id: rest.customerId } },
                    }),
                    enabledBy: { connect: { id: enabledById } },
                },
            });
            const proformaItems = await Promise.all(items.map((item) => tx.proformaItem.create({
                data: {
                    proforma: { connect: { id: proforma.id } },
                    productVariant: { connect: { id: item.productVariantId } },
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    currency: item.currency ?? 'ETB',
                    remark: item.remark,
                    enabledBy: { connect: { id: enabledById } },
                },
            })));
            return { ...proforma, ProformaItem: proformaItems };
        });
    }
    findAll() {
        return this.prisma.proforma.findMany({
            include: this.defaultInclude,
            orderBy: { createdAt: 'desc' },
        });
    }
    filter(query) {
        return this.prisma.proforma.findMany({
            where: {
                AND: [
                    query.ids ? { id: { in: query.ids } } : {},
                    query.proformaTo
                        ? {
                            proformaTo: { contains: query.proformaTo, mode: 'insensitive' },
                        }
                        : {},
                    query.status ? { status: query.status } : {},
                    query.customerId ? { customerId: query.customerId } : {},
                    query.isEnabled !== undefined ? { isEnabled: query.isEnabled } : {},
                    query.enabledByIds ? { enabledById: { in: query.enabledByIds } } : {},
                    query.enabledStartDate
                        ? { createdAt: { gte: query.enabledStartDate } }
                        : {},
                    query.enabledEndDate
                        ? { createdAt: { lte: query.enabledEndDate } }
                        : {},
                ],
            },
            include: this.defaultInclude,
            orderBy: { createdAt: 'desc' },
        });
    }
    findOne(id) {
        return this.prisma.proforma.findUnique({
            where: { id },
            include: this.defaultInclude,
        });
    }
    update(id, data) {
        return this.prisma.proforma.update({
            where: { id },
            data,
            include: this.defaultInclude,
        });
    }
    async send(id) {
        return this.prisma.proforma.update({
            where: { id },
            data: { status: client_1.ProformaStatus.SENT },
        });
    }
    async cancel(id) {
        return this.prisma.proforma.update({
            where: { id },
            data: { status: client_1.ProformaStatus.CANCELLED },
        });
    }
    async getConvertData(id) {
        const proforma = await this.prisma.proforma.findUnique({
            where: { id },
            include: {
                customer: true,
                ProformaItem: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                                ProductVariantPrice: { where: { isEnabled: true } },
                            },
                        },
                    },
                },
            },
        });
        if (!proforma) {
            throw new common_1.NotFoundException('Proforma not found');
        }
        return proforma;
    }
    async markConverted(id, orderId) {
        return this.prisma.proforma.update({
            where: { id },
            data: {
                status: client_1.ProformaStatus.CONVERTED,
                convertedToOrderId: orderId,
            },
        });
    }
    enable(id) {
        return this.prisma.proforma.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.proforma.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.proforma.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.ProformaService = ProformaService;
exports.ProformaService = ProformaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProformaService);
//# sourceMappingURL=proforma.service.js.map
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
exports.PurchaseRequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let PurchaseRequestService = class PurchaseRequestService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { items, ...rest } = data;
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe('SELECT pg_advisory_xact_lock(777003)');
            let purchaseRequestNumber = 0;
            const last = await tx.purchaseRequest.findFirst({
                orderBy: { createdAt: 'desc' },
            });
            if (last) {
                purchaseRequestNumber = last.purchaseRequestNumber + 1;
            }
            const pr = await tx.purchaseRequest.create({
                data: {
                    supplier: { connect: { id: rest.supplierId } },
                    remark: rest.remark,
                    expectedDeliveryDate: rest.expectedDeliveryDate,
                    status: rest.status,
                    enabledBy: rest.enabledById
                        ? { connect: { id: rest.enabledById } }
                        : undefined,
                    purchaseRequestNumber,
                },
            });
            const prItems = await Promise.all(items.map((item) => tx.purchaseRequestItem.create({
                data: {
                    purchaseRequest: { connect: { id: pr.id } },
                    productVariant: { connect: { id: item.productVariantId } },
                    requestedQuantity: item.requestedQuantity,
                    expectedUnitPrice: item.expectedUnitPrice,
                    currency: item.currency,
                    remark: item.remark,
                    enabledBy: rest.enabledById
                        ? { connect: { id: rest.enabledById } }
                        : undefined,
                },
            })));
            return { ...pr, PurchaseRequestItem: prItems };
        });
    }
    findAll() {
        return this.prisma.purchaseRequest.findMany({
            include: {
                supplier: true,
                PurchaseRequestItem: {
                    include: { productVariant: true },
                },
                enabledBy: true,
                approvedBy: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.purchaseRequest.findMany({
            where: {
                AND: [
                    query.ids ? { id: { in: query.ids } } : {},
                    query.supplierIds ? { supplierId: { in: query.supplierIds } } : {},
                    query.status ? { status: query.status } : {},
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
                    query.purchaseRequestNumber
                        ? { purchaseRequestNumber: query.purchaseRequestNumber }
                        : {},
                ],
            },
            include: {
                supplier: true,
                PurchaseRequestItem: {
                    include: { productVariant: true },
                },
                enabledBy: true,
                approvedBy: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    findOne(id) {
        return this.prisma.purchaseRequest.findUnique({
            where: { id },
            include: {
                supplier: true,
                PurchaseRequestItem: {
                    include: {
                        productVariant: {
                            include: { product: true, brand: true },
                        },
                    },
                },
                enabledBy: true,
                approvedBy: true,
            },
        });
    }
    async update(id, data) {
        const pr = await this.prisma.purchaseRequest.findUnique({
            where: { id },
        });
        if (!pr)
            throw new common_1.BadRequestException('Purchase request not found');
        if (pr.status !== client_1.PurchaseRequestStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft purchase requests can be updated');
        }
        return this.prisma.purchaseRequest.update({
            where: { id },
            data,
        });
    }
    async submit(id) {
        const pr = await this.prisma.purchaseRequest.findUnique({
            where: { id },
        });
        if (!pr)
            throw new common_1.BadRequestException('Purchase request not found');
        if (pr.status !== client_1.PurchaseRequestStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft purchase requests can be submitted');
        }
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: { status: client_1.PurchaseRequestStatus.PENDING_APPROVAL },
        });
    }
    async approve(id, approvedById) {
        const pr = await this.prisma.purchaseRequest.findUnique({
            where: { id },
        });
        if (!pr)
            throw new common_1.BadRequestException('Purchase request not found');
        if (pr.status !== client_1.PurchaseRequestStatus.PENDING_APPROVAL) {
            throw new common_1.BadRequestException('Only pending approval requests can be approved');
        }
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: {
                status: client_1.PurchaseRequestStatus.APPROVED,
                approvedById,
                approvedDate: new Date(),
            },
        });
    }
    async reject(id, approvedById) {
        const pr = await this.prisma.purchaseRequest.findUnique({
            where: { id },
        });
        if (!pr)
            throw new common_1.BadRequestException('Purchase request not found');
        if (pr.status !== client_1.PurchaseRequestStatus.PENDING_APPROVAL) {
            throw new common_1.BadRequestException('Only pending approval requests can be rejected');
        }
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: {
                status: client_1.PurchaseRequestStatus.REJECTED,
                approvedById,
                approvedDate: new Date(),
            },
        });
    }
    async markOrdered(id) {
        const pr = await this.prisma.purchaseRequest.findUnique({
            where: { id },
        });
        if (!pr)
            throw new common_1.BadRequestException('Purchase request not found');
        if (pr.status !== client_1.PurchaseRequestStatus.APPROVED) {
            throw new common_1.BadRequestException('Only approved requests can be marked as ordered');
        }
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: {
                status: client_1.PurchaseRequestStatus.ORDERED,
                orderedDate: new Date(),
            },
        });
    }
    async receive(id) {
        const pr = await this.prisma.purchaseRequest.findUnique({
            where: { id },
            include: { PurchaseRequestItem: true },
        });
        if (!pr)
            throw new common_1.BadRequestException('Purchase request not found');
        if (pr.status !== client_1.PurchaseRequestStatus.ORDERED &&
            pr.status !== client_1.PurchaseRequestStatus.PARTIALLY_RECEIVED) {
            throw new common_1.BadRequestException('Only ordered or partially received requests can be received');
        }
        const allFullyReceived = pr.PurchaseRequestItem.every((item) => item.receivedQuantity >= item.requestedQuantity);
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: {
                status: allFullyReceived
                    ? client_1.PurchaseRequestStatus.RECEIVED
                    : client_1.PurchaseRequestStatus.PARTIALLY_RECEIVED,
                receivedDate: allFullyReceived ? new Date() : undefined,
            },
        });
    }
    async cancel(id) {
        const pr = await this.prisma.purchaseRequest.findUnique({
            where: { id },
        });
        if (!pr)
            throw new common_1.BadRequestException('Purchase request not found');
        if (pr.status === client_1.PurchaseRequestStatus.RECEIVED ||
            pr.status === client_1.PurchaseRequestStatus.CANCELLED) {
            throw new common_1.BadRequestException('Cannot cancel this purchase request');
        }
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: { status: client_1.PurchaseRequestStatus.CANCELLED },
        });
    }
    enable(id) {
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.purchaseRequest.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.PurchaseRequestService = PurchaseRequestService;
exports.PurchaseRequestService = PurchaseRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchaseRequestService);
//# sourceMappingURL=purchase-request.service.js.map
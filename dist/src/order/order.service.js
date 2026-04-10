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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkout(data, enabledById) {
        return this.prisma.$transaction(async (tx) => {
            let customerId;
            if (data.customerId) {
                const existing = await tx.customer.findUnique({
                    where: { id: data.customerId },
                });
                if (!existing) {
                    throw new Error('Customer not found');
                }
                customerId = existing.id;
            }
            else {
                const customer = await tx.customer.create({
                    data: {
                        name: data.customer.name,
                        phoneNumber: data.customer.phoneNumber,
                        tin: data.customer.tin,
                        address: data.customer.address ?? '',
                        enabledById,
                    },
                });
                customerId = customer.id;
            }
            await tx.$executeRawUnsafe('SELECT pg_advisory_xact_lock(777001)');
            let orderNumber = 0;
            const lastOrder = await tx.order.findFirst({
                orderBy: { createdAt: 'desc' },
            });
            if (lastOrder) {
                orderNumber = lastOrder.orderNumber + 1;
            }
            const order = await tx.order.create({
                data: {
                    customer: { connect: { id: customerId } },
                    paymentOption: { connect: { id: data.order.paymentOptionId } },
                    ...(data.order.expectedBankAccountId && {
                        expectedBankAccount: {
                            connect: { id: data.order.expectedBankAccountId },
                        },
                    }),
                    enabledBy: { connect: { id: enabledById } },
                    paymentOptionRefernce: data.order.paymentOptionRefernce,
                    remark: data.order.remark,
                    orderNumber,
                },
            });
            const orderItems = await Promise.all(data.items.map((item) => tx.orderItem.create({
                data: {
                    order: { connect: { id: order.id } },
                    productVariant: { connect: { id: item.productVariantId } },
                    productVariantPrice: {
                        connect: { id: item.productVariantPriceId },
                    },
                    purchasedQuantity: item.purchasedQuantity,
                    orderQuantity: item.purchasedQuantity,
                    price: item.price,
                    currency: item.currency,
                },
            })));
            return { customerId, order, orderItems };
        });
    }
    async create(data) {
        const { customerId, paymentOptionId, expectedBankAccountId, enabledById, ...rest } = data;
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe('SELECT pg_advisory_xact_lock(777001)');
            let orderNumber = 0;
            const lastOrder = await tx.order.findFirst({
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (lastOrder) {
                orderNumber = lastOrder.orderNumber + 1;
            }
            return tx.order.create({
                data: {
                    ...rest,
                    customer: { connect: { id: customerId } },
                    paymentOption: { connect: { id: paymentOptionId } },
                    expectedBankAccount: { connect: { id: expectedBankAccountId } },
                    enabledBy: { connect: { id: enabledById } },
                    orderNumber,
                },
            });
        });
    }
    findAll() {
        return this.prisma.order.findMany({
            include: {
                customer: true,
                paymentOption: true,
                expectedBankAccount: true,
                OrderItem: true,
            },
        });
    }
    filter(query) {
        console.log('orderQuery:', query);
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.order.findMany({
            where: {
                AND: [
                    query.customerIds ? { customerId: { in: query.customerIds } } : {},
                    query.paymentOptionIds
                        ? { paymentOptionId: { in: query.paymentOptionIds } }
                        : {},
                    query.paymentOptionRefernce
                        ? { paymentOptionRefernce: query.paymentOptionRefernce }
                        : {},
                    query.expectedBankAccountIds
                        ? { expectedBankAccountId: { in: query.expectedBankAccountIds } }
                        : {},
                    query.remark ? { remark: query.remark } : {},
                    query.isFullyPaid ? { isFullyPaid: query.isFullyPaid } : {},
                    query.isPartiallyPaid
                        ? { isPartiallyPaid: query.isPartiallyPaid }
                        : {},
                    query.isFullyApproved
                        ? { isFullyApproved: query.isFullyApproved }
                        : {},
                    query.isPartiallyApproved
                        ? { isPartiallyApproved: query.isPartiallyApproved }
                        : {},
                    query.status ? { status: query.status } : {},
                    query.lastApprovedDate
                        ? { lastApprovedDate: query.lastApprovedDate }
                        : {},
                    query.isPartiallyFulfilled
                        ? { isPartiallyFulfilled: query.isPartiallyFulfilled }
                        : {},
                    query.isFullyFulfilled
                        ? { isFullyFulfilled: query.isFullyFulfilled }
                        : {},
                    query.lastFulfilledDate
                        ? { lastFulfilledDate: query.lastFulfilledDate }
                        : {},
                    query.isPartiallyShipped
                        ? { isPartiallyShipped: query.isPartiallyShipped }
                        : {},
                    query.isFullyShipped ? { isFullyShipped: query.isFullyShipped } : {},
                    query.orderNumber ? { orderNumber: query.orderNumber } : {},
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
                customer: true,
                paymentOption: true,
                expectedBankAccount: true,
                OrderItem: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                                ProductVariantAttribute: true,
                            },
                        },
                    },
                },
            },
        });
    }
    findOne(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                customer: true,
                paymentOption: true,
                expectedBankAccount: true,
                OrderItem: true,
            },
        });
    }
    pendingPayments() {
        return this.prisma.order.findMany({
            where: {
                isFullyPaid: false,
            },
            include: {
                customer: true,
                paymentOption: true,
                expectedBankAccount: true,
                OrderItem: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                                ProductVariantAttribute: true,
                            },
                        },
                    },
                },
                OrderPayment: true,
            },
        });
    }
    completedPayments() {
        return this.prisma.order.findMany({
            where: {
                isFullyPaid: true,
            },
            include: {
                customer: true,
                paymentOption: true,
                expectedBankAccount: true,
                OrderItem: true,
                OrderPayment: true,
            },
        });
    }
    update(id, updateOrderDto) {
        const { customerId, paymentOptionId, expectedBankAccountId, enabledById, ...rest } = updateOrderDto;
        return this.prisma.order.update({
            where: { id },
            data: {
                ...rest,
                ...(customerId && { customer: { connect: { id: customerId } } }),
                ...(paymentOptionId && {
                    paymentOption: { connect: { id: paymentOptionId } },
                }),
                ...(expectedBankAccountId && {
                    expectedBankAccount: { connect: { id: expectedBankAccountId } },
                }),
                ...(enabledById && { enabledBy: { connect: { id: enabledById } } }),
            },
        });
    }
    approve(id) {
        return this.prisma.$transaction(async (tx) => {
            await tx.orderItem.updateMany({
                where: { orderId: id },
                data: { isApproved: true },
            });
            return tx.order.update({
                where: { id },
                data: {
                    isFullyApproved: true,
                    isPartiallyApproved: true,
                    lastApprovedDate: new Date(),
                    status: 'PENDING_FULFILLMENT',
                },
            });
        });
    }
    enable(id) {
        return this.prisma.order.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.order.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.order.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map
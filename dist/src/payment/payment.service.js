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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PaymentService = class PaymentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { customerId, paymentOptionId, bankAccountId, enabledById, orderPayments, ...rest } = data;
        const allocatedPayments = orderPayments ?? [];
        return this.prisma.$transaction(async (tx) => {
            const payment = await tx.payment.create({
                data: {
                    ...rest,
                    unassignedAmount: rest.amount -
                        allocatedPayments.reduce((acc, curr) => acc + curr.paidAmount, 0),
                    paymentOption: {
                        connect: { id: paymentOptionId },
                    },
                    customer: {
                        connect: { id: customerId },
                    },
                    bankAccount: {
                        connect: { id: bankAccountId },
                    },
                    OrderPayment: allocatedPayments.length
                        ? {
                            createMany: {
                                data: allocatedPayments,
                            },
                        }
                        : undefined,
                    enabledBy: {
                        connect: { id: enabledById },
                    },
                },
            });
            if (allocatedPayments.length === 0) {
                return payment;
            }
            const orderIds = Array.from(new Set(allocatedPayments.map((orderPayment) => orderPayment.orderId)));
            const orders = await tx.order.findMany({
                where: {
                    id: {
                        in: orderIds,
                    },
                },
                include: {
                    OrderPayment: true,
                    OrderItem: true,
                },
            });
            for (const order of orders) {
                const totalPaidAmount = order.OrderPayment.reduce((acc, curr) => acc + curr.paidAmount, 0);
                const expectedAmount = order.OrderItem.reduce((acc, curr) => acc + curr.price * curr.purchasedQuantity, 0);
                await tx.order.update({
                    where: { id: order.id },
                    data: {
                        isFullyPaid: totalPaidAmount >= expectedAmount,
                        isPartiallyPaid: totalPaidAmount > 0 && totalPaidAmount < expectedAmount,
                    },
                });
            }
            return tx.order.findMany({
                where: {
                    id: {
                        in: orderIds,
                    },
                },
            });
        });
    }
    findAll() {
        return this.prisma.payment.findMany({
            include: {
                customer: true,
                paymentOption: true,
                bankAccount: {
                    include: {
                        bank: true,
                    },
                },
            },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.payment.findMany({
            where: {
                AND: [
                    query.customerIds ? { customerId: { in: query.customerIds } } : {},
                    query.paymentOptionIds
                        ? { paymentOptionId: { in: query.paymentOptionIds } }
                        : {},
                    query.referenceNumber
                        ? { referenceNumber: query.referenceNumber }
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
                customer: true,
                paymentOption: true,
                bankAccount: {
                    include: {
                        bank: true,
                    },
                },
            },
        });
    }
    findOne(id) {
        return this.prisma.payment.findUnique({
            where: { id },
            include: {
                customer: true,
                paymentOption: true,
                bankAccount: {
                    include: {
                        bank: true,
                    },
                },
            },
        });
    }
    update(id, updatePaymentDto) {
        return this.prisma.payment.update({
            where: { id },
            data: updatePaymentDto,
        });
    }
    enable(id) {
        return this.prisma.payment.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.payment.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.payment.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map
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
exports.OrderPaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OrderPaymentService = class OrderPaymentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const paymentId = data.paymentId;
        const orderId = data.orderId;
        const expectedAmounts = await this.prisma.orderItem.findMany({
            where: { orderId },
            include: {
                productVariantPrice: {
                    select: {
                        listPrice: true,
                    },
                },
            },
        });
        const totalExpectedAmount = expectedAmounts.reduce((acc, curr) => acc + curr.productVariantPrice.listPrice, 0);
        let transactions = [];
        transactions.push(this.prisma.payment.update({
            where: { id: paymentId },
            data: {
                unassignedAmount: {
                    decrement: data.paidAmount,
                },
            },
        }));
        transactions.push(this.prisma.order.update({
            where: { id: data.orderId },
            data: {
                isPartiallyPaid: true,
                isFullyPaid: totalExpectedAmount < data.paidAmount,
            },
        }));
        transactions.push(this.prisma.orderPayment.create({
            data,
        }));
        return this.prisma.$transaction(transactions);
    }
    createBulk(data) {
        return this.prisma.orderPayment.createMany({
            data,
        });
    }
    findAll() {
        return this.prisma.orderPayment.findMany({
            include: {
                order: {
                    include: {
                        customer: true,
                    },
                },
                payment: {
                    include: {
                        paymentOption: true,
                        customer: true,
                        bankAccount: {
                            include: {
                                bank: true,
                            },
                        },
                    },
                },
            },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.orderPayment.findMany({
            where: {
                AND: [
                    query.orderIds ? { orderId: { in: query.orderIds } } : {},
                    query.paymentIds ? { paymentId: { in: query.paymentIds } } : {},
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
                order: true,
                payment: {
                    include: {
                        paymentOption: true,
                        customer: true,
                        bankAccount: {
                            include: {
                                bank: true,
                            },
                        },
                    },
                },
            },
        });
    }
    findOne(id) {
        return this.prisma.orderPayment.findUnique({
            where: { id },
            include: {
                order: true,
                payment: {
                    include: {
                        paymentOption: true,
                        customer: true,
                        bankAccount: {
                            include: {
                                bank: true,
                            },
                        },
                    },
                },
            },
        });
    }
    update(id, updateOrderPaymentDto) {
        return this.prisma.orderPayment.update({
            where: { id },
            data: updateOrderPaymentDto,
        });
    }
    enable(id) {
        return this.prisma.orderPayment.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.orderPayment.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.orderPayment.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.OrderPaymentService = OrderPaymentService;
exports.OrderPaymentService = OrderPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderPaymentService);
//# sourceMappingURL=order-payment.service.js.map
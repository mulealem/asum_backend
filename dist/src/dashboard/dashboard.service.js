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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOverview() {
        const days = this.buildChartBuckets(7);
        const chartLookup = new Map(days.map((day) => [day.key, day]));
        const currentPeriodKeys = new Set(days.map((day) => day.key));
        const previousPeriodKeys = new Set(this.buildChartBuckets(7, 7).map((day) => day.key));
        const [orders, fulfillments, customers] = await Promise.all([
            this.prisma.order.findMany({
                where: { isEnabled: true },
                select: {
                    id: true,
                    createdAt: true,
                    customer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    OrderItem: {
                        select: {
                            price: true,
                            orderQuantity: true,
                        },
                    },
                },
            }),
            this.prisma.orderItemFulfillment.findMany({
                where: { isEnabled: true },
                select: {
                    createdAt: true,
                    fulfilledQuantity: true,
                    orderItem: {
                        select: {
                            price: true,
                        },
                    },
                    stock: {
                        select: {
                            purchasePrice: true,
                        },
                    },
                },
            }),
            this.prisma.customer.findMany({
                where: { isEnabled: true },
                select: {
                    id: true,
                    createdAt: true,
                },
            }),
        ]);
        let totalSales = 0;
        let salesCurrentPeriod = 0;
        let salesPreviousPeriod = 0;
        const customerMap = new Map();
        for (const order of orders) {
            const orderTotal = order.OrderItem.reduce((sum, item) => sum + item.price * item.orderQuantity, 0);
            const orderQuantity = order.OrderItem.reduce((sum, item) => sum + item.orderQuantity, 0);
            const orderDayKey = this.toDayKey(order.createdAt);
            totalSales += orderTotal;
            if (currentPeriodKeys.has(orderDayKey)) {
                salesCurrentPeriod += orderTotal;
            }
            else if (previousPeriodKeys.has(orderDayKey)) {
                salesPreviousPeriod += orderTotal;
            }
            const bucket = chartLookup.get(orderDayKey);
            if (bucket) {
                bucket.revenue += orderTotal;
            }
            const customerSummary = customerMap.get(order.customer.id) ?? {
                customerId: order.customer.id,
                name: order.customer.name,
                spend: 0,
                quantity: 0,
                orders: 0,
            };
            customerSummary.spend += orderTotal;
            customerSummary.quantity += orderQuantity;
            customerSummary.orders += 1;
            customerMap.set(order.customer.id, customerSummary);
        }
        let totalProfit = 0;
        let totalProductsSold = 0;
        let profitCurrentPeriod = 0;
        let profitPreviousPeriod = 0;
        let soldCurrentPeriod = 0;
        let soldPreviousPeriod = 0;
        for (const fulfillment of fulfillments) {
            const profit = (fulfillment.orderItem.price - fulfillment.stock.purchasePrice) *
                fulfillment.fulfilledQuantity;
            const fulfillmentDayKey = this.toDayKey(fulfillment.createdAt);
            totalProfit += profit;
            totalProductsSold += fulfillment.fulfilledQuantity;
            if (currentPeriodKeys.has(fulfillmentDayKey)) {
                profitCurrentPeriod += profit;
                soldCurrentPeriod += fulfillment.fulfilledQuantity;
            }
            else if (previousPeriodKeys.has(fulfillmentDayKey)) {
                profitPreviousPeriod += profit;
                soldPreviousPeriod += fulfillment.fulfilledQuantity;
            }
            const bucket = chartLookup.get(fulfillmentDayKey);
            if (bucket) {
                bucket.profit += profit;
            }
        }
        const totalCustomers = customers.length;
        const customersCurrentPeriod = customers.filter((customer) => currentPeriodKeys.has(this.toDayKey(customer.createdAt))).length;
        const customersPreviousPeriod = customers.filter((customer) => previousPeriodKeys.has(this.toDayKey(customer.createdAt))).length;
        return {
            summary: {
                totalSales: this.roundAmount(totalSales),
                totalProfit: this.roundAmount(totalProfit),
                totalProductsSold,
                totalCustomers,
                trends: {
                    sales: this.calculateTrend(salesCurrentPeriod, salesPreviousPeriod),
                    profit: this.calculateTrend(profitCurrentPeriod, profitPreviousPeriod),
                    productsSold: this.calculateTrend(soldCurrentPeriod, soldPreviousPeriod),
                    customers: this.calculateTrend(customersCurrentPeriod, customersPreviousPeriod),
                },
            },
            charts: {
                categories: days.map((day) => day.label),
                revenue: days.map((day) => this.roundAmount(day.revenue)),
                profit: days.map((day) => this.roundAmount(day.profit)),
            },
            topCustomers: Array.from(customerMap.values())
                .sort((left, right) => right.spend - left.spend)
                .slice(0, 10)
                .map((customer) => ({
                ...customer,
                spend: this.roundAmount(customer.spend),
            })),
        };
    }
    calculateTrend(currentValue, previousValue) {
        if (currentValue === 0 && previousValue === 0) {
            return 0;
        }
        if (previousValue === 0) {
            return 100;
        }
        return this.roundAmount(((currentValue - previousValue) / previousValue) * 100);
    }
    buildChartBuckets(days, startOffset = 0) {
        const buckets = [];
        for (let index = days - 1 + startOffset; index >= startOffset; index -= 1) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() - index);
            buckets.push({
                key: this.toDayKey(date),
                label: date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                }),
                revenue: 0,
                profit: 0,
            });
        }
        return buckets;
    }
    toDayKey(date) {
        const value = new Date(date);
        value.setHours(0, 0, 0, 0);
        return value.toISOString().slice(0, 10);
    }
    roundAmount(value) {
        return Number(value.toFixed(2));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
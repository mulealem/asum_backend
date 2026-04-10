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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ReportService = class ReportService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async inventoryStatus(query) {
        const where = { isEnabled: true };
        if (query.locationIds?.length) {
            where.locationId = { in: query.locationIds };
        }
        if (query.productVariantIds?.length) {
            where.productVariantId = { in: query.productVariantIds };
        }
        const stocks = await this.prisma.stock.findMany({
            where,
            include: {
                productVariant: {
                    include: {
                        product: true,
                        ProductVariantAttribute: true,
                    },
                },
                location: true,
                supplier: true,
            },
        });
        const groupMap = new Map();
        for (const stock of stocks) {
            const key = stock.productVariantId;
            const existing = groupMap.get(key);
            const value = stock.remainingUnits * stock.purchasePrice;
            const attrs = stock.productVariant.ProductVariantAttribute.map((a) => `${a.key}: ${a.value}`).join(', ');
            if (existing) {
                existing.totalPurchased += stock.totalPurchasedUnits;
                existing.totalRemaining += stock.remainingUnits;
                existing.totalValue += value;
                if (!existing.locations.includes(stock.location.title)) {
                    existing.locations.push(stock.location.title);
                }
            }
            else {
                groupMap.set(key, {
                    productVariantId: key,
                    productName: stock.productVariant.product.title,
                    variantCode: stock.productVariant.code,
                    attributes: attrs,
                    totalPurchased: stock.totalPurchasedUnits,
                    totalRemaining: stock.remainingUnits,
                    totalValue: value,
                    locations: [stock.location.title],
                });
            }
        }
        const rows = Array.from(groupMap.values()).sort((a, b) => b.totalRemaining - a.totalRemaining);
        const totalItems = rows.reduce((s, r) => s + r.totalRemaining, 0);
        const totalValue = rows.reduce((s, r) => s + r.totalValue, 0);
        return {
            summary: {
                totalProducts: rows.length,
                totalItems,
                totalValue: this.round(totalValue),
            },
            rows,
            chart: {
                categories: rows.slice(0, 10).map((r) => r.productName),
                series: [
                    {
                        name: 'Remaining Units',
                        data: rows.slice(0, 10).map((r) => r.totalRemaining),
                    },
                ],
            },
        };
    }
    async salesReport(query) {
        const orderWhere = {
            isEnabled: true,
            createdAt: { gte: query.startDate, lte: query.endDate },
        };
        if (query.customerIds?.length) {
            orderWhere.customerId = { in: query.customerIds };
        }
        const orders = await this.prisma.order.findMany({
            where: orderWhere,
            include: {
                customer: true,
                OrderItem: {
                    where: query.productVariantIds?.length
                        ? { productVariantId: { in: query.productVariantIds } }
                        : undefined,
                    include: {
                        productVariant: {
                            include: { product: true, ProductVariantAttribute: true },
                        },
                    },
                },
            },
        });
        const productMap = new Map();
        let totalRevenue = 0;
        let totalQuantity = 0;
        let totalOrders = 0;
        const dailyMap = new Map();
        for (const order of orders) {
            totalOrders++;
            for (const item of order.OrderItem) {
                const revenue = item.price * item.purchasedQuantity;
                totalRevenue += revenue;
                totalQuantity += item.purchasedQuantity;
                const key = item.productVariantId;
                const existing = productMap.get(key);
                const attrs = item.productVariant.ProductVariantAttribute.map((a) => `${a.key}: ${a.value}`).join(', ');
                if (existing) {
                    existing.totalQuantity += item.purchasedQuantity;
                    existing.totalRevenue += revenue;
                    existing.orderCount++;
                }
                else {
                    productMap.set(key, {
                        productVariantId: key,
                        productName: item.productVariant.product.title,
                        variantCode: item.productVariant.code,
                        attributes: attrs,
                        totalQuantity: item.purchasedQuantity,
                        totalRevenue: revenue,
                        orderCount: 1,
                    });
                }
                const dayKey = order.createdAt.toISOString().slice(0, 10);
                const dayEntry = dailyMap.get(dayKey) || { revenue: 0, quantity: 0 };
                dayEntry.revenue += revenue;
                dayEntry.quantity += item.purchasedQuantity;
                dailyMap.set(dayKey, dayEntry);
            }
        }
        const rows = Array.from(productMap.values()).sort((a, b) => b.totalRevenue - a.totalRevenue);
        const dailySorted = Array.from(dailyMap.entries()).sort(([a], [b]) => a.localeCompare(b));
        return {
            summary: {
                totalRevenue: this.round(totalRevenue),
                totalQuantity,
                totalOrders,
                uniqueProducts: rows.length,
            },
            rows: rows.map((r) => ({
                ...r,
                totalRevenue: this.round(r.totalRevenue),
            })),
            chart: {
                categories: dailySorted.map(([date]) => date),
                series: [
                    {
                        name: 'Revenue',
                        data: dailySorted.map(([, v]) => this.round(v.revenue)),
                    },
                    {
                        name: 'Quantity Sold',
                        data: dailySorted.map(([, v]) => v.quantity),
                    },
                ],
            },
        };
    }
    async inventoryValuation(query) {
        const where = { isEnabled: true };
        if (query.locationIds?.length) {
            where.locationId = { in: query.locationIds };
        }
        const stocks = await this.prisma.stock.findMany({
            where,
            include: {
                productVariant: {
                    include: { product: true, ProductVariantAttribute: true },
                },
                location: true,
            },
        });
        const groupMap = new Map();
        for (const stock of stocks) {
            const key = stock.productVariantId;
            const existing = groupMap.get(key);
            const units = stock.remainingUnits;
            const purchase = units * stock.purchasePrice;
            const transport = units * stock.transportationFree;
            const tax = units * stock.taxFee;
            const misc = units * stock.miscellaneousFee;
            const total = purchase + transport + tax + misc;
            const retail = units * stock.expectedRetailPrice;
            const attrs = stock.productVariant.ProductVariantAttribute.map((a) => `${a.key}: ${a.value}`).join(', ');
            if (existing) {
                existing.remainingUnits += units;
                existing.purchaseCost += purchase;
                existing.transportCost += transport;
                existing.taxCost += tax;
                existing.miscCost += misc;
                existing.totalCost += total;
                existing.retailValue += retail;
            }
            else {
                groupMap.set(key, {
                    productVariantId: key,
                    productName: stock.productVariant.product.title,
                    variantCode: stock.productVariant.code,
                    attributes: attrs,
                    remainingUnits: units,
                    purchaseCost: purchase,
                    transportCost: transport,
                    taxCost: tax,
                    miscCost: misc,
                    totalCost: total,
                    retailValue: retail,
                });
            }
        }
        const rows = Array.from(groupMap.values()).sort((a, b) => b.totalCost - a.totalCost);
        const totalCost = rows.reduce((s, r) => s + r.totalCost, 0);
        const totalRetail = rows.reduce((s, r) => s + r.retailValue, 0);
        return {
            summary: {
                totalCost: this.round(totalCost),
                totalRetailValue: this.round(totalRetail),
                potentialProfit: this.round(totalRetail - totalCost),
                totalProducts: rows.length,
            },
            rows: rows.map((r) => ({
                ...r,
                purchaseCost: this.round(r.purchaseCost),
                transportCost: this.round(r.transportCost),
                taxCost: this.round(r.taxCost),
                miscCost: this.round(r.miscCost),
                totalCost: this.round(r.totalCost),
                retailValue: this.round(r.retailValue),
            })),
            chart: {
                categories: rows.slice(0, 10).map((r) => r.productName),
                series: [
                    {
                        name: 'Total Cost',
                        data: rows.slice(0, 10).map((r) => this.round(r.totalCost)),
                    },
                    {
                        name: 'Retail Value',
                        data: rows.slice(0, 10).map((r) => this.round(r.retailValue)),
                    },
                ],
            },
        };
    }
    async stockMovement(query) {
        const dateFilter = { gte: query.startDate, lte: query.endDate };
        const stockWhere = { isEnabled: true, createdAt: dateFilter };
        if (query.productVariantIds?.length) {
            stockWhere.productVariantId = { in: query.productVariantIds };
        }
        if (query.locationIds?.length) {
            stockWhere.locationId = { in: query.locationIds };
        }
        const [inflows, fulfillments, discards] = await Promise.all([
            this.prisma.stock.findMany({
                where: stockWhere,
                include: {
                    productVariant: {
                        include: { product: true, ProductVariantAttribute: true },
                    },
                    location: true,
                },
            }),
            this.prisma.orderItemFulfillment.findMany({
                where: {
                    isEnabled: true,
                    createdAt: dateFilter,
                    ...(query.productVariantIds?.length
                        ? { stock: { productVariantId: { in: query.productVariantIds } } }
                        : {}),
                },
                include: {
                    stock: {
                        include: {
                            productVariant: {
                                include: { product: true, ProductVariantAttribute: true },
                            },
                        },
                    },
                },
            }),
            this.prisma.discardedStock.findMany({
                where: {
                    isEnabled: true,
                    createdAt: dateFilter,
                    ...(query.productVariantIds?.length
                        ? { stock: { productVariantId: { in: query.productVariantIds } } }
                        : {}),
                },
                include: {
                    stock: {
                        include: {
                            productVariant: {
                                include: { product: true, ProductVariantAttribute: true },
                            },
                        },
                    },
                },
            }),
        ]);
        const movementMap = new Map();
        const getOrCreate = (pv) => {
            const key = pv.id;
            if (!movementMap.has(key)) {
                const attrs = pv.ProductVariantAttribute.map((a) => `${a.key}: ${a.value}`).join(', ');
                movementMap.set(key, {
                    productVariantId: key,
                    productName: pv.product.title,
                    variantCode: pv.code,
                    attributes: attrs,
                    inflow: 0,
                    fulfilled: 0,
                    discarded: 0,
                    net: 0,
                });
            }
            return movementMap.get(key);
        };
        for (const stock of inflows) {
            const entry = getOrCreate(stock.productVariant);
            entry.inflow += stock.totalPurchasedUnits;
        }
        for (const f of fulfillments) {
            const entry = getOrCreate(f.stock.productVariant);
            entry.fulfilled += f.fulfilledQuantity;
        }
        for (const d of discards) {
            const entry = getOrCreate(d.stock.productVariant);
            entry.discarded += d.quantity;
        }
        const rows = Array.from(movementMap.values()).map((r) => ({
            ...r,
            net: r.inflow - r.fulfilled - r.discarded,
        }));
        rows.sort((a, b) => Math.abs(b.net) - Math.abs(a.net));
        const totalInflow = rows.reduce((s, r) => s + r.inflow, 0);
        const totalOutflow = rows.reduce((s, r) => s + r.fulfilled + r.discarded, 0);
        return {
            summary: {
                totalInflow,
                totalFulfilled: rows.reduce((s, r) => s + r.fulfilled, 0),
                totalDiscarded: rows.reduce((s, r) => s + r.discarded, 0),
                netMovement: totalInflow - totalOutflow,
            },
            rows,
            chart: {
                categories: rows.slice(0, 10).map((r) => r.productName),
                series: [
                    {
                        name: 'Inflow',
                        data: rows.slice(0, 10).map((r) => r.inflow),
                    },
                    {
                        name: 'Fulfilled',
                        data: rows.slice(0, 10).map((r) => r.fulfilled),
                    },
                    {
                        name: 'Discarded',
                        data: rows.slice(0, 10).map((r) => r.discarded),
                    },
                ],
            },
        };
    }
    async topCustomers(query) {
        const limit = query.limit || 10;
        const orders = await this.prisma.order.findMany({
            where: {
                isEnabled: true,
                createdAt: { gte: query.startDate, lte: query.endDate },
            },
            include: {
                customer: true,
                OrderItem: true,
            },
        });
        const customerMap = new Map();
        for (const order of orders) {
            const key = order.customerId;
            const existing = customerMap.get(key);
            const spend = order.OrderItem.reduce((s, i) => s + i.price * i.purchasedQuantity, 0);
            const qty = order.OrderItem.reduce((s, i) => s + i.purchasedQuantity, 0);
            if (existing) {
                existing.totalSpend += spend;
                existing.totalQuantity += qty;
                existing.orderCount++;
            }
            else {
                customerMap.set(key, {
                    customerId: key,
                    customerName: order.customer.name,
                    phoneNumber: order.customer.phoneNumber,
                    totalSpend: spend,
                    totalQuantity: qty,
                    orderCount: 1,
                });
            }
        }
        const rows = Array.from(customerMap.values())
            .sort((a, b) => b.totalSpend - a.totalSpend)
            .slice(0, limit)
            .map((r) => ({ ...r, totalSpend: this.round(r.totalSpend) }));
        return {
            summary: {
                totalCustomers: customerMap.size,
                topCustomerSpend: rows.length > 0 ? rows[0].totalSpend : 0,
                totalRevenue: this.round(Array.from(customerMap.values()).reduce((s, r) => s + r.totalSpend, 0)),
            },
            rows,
            chart: {
                categories: rows.map((r) => r.customerName),
                series: [
                    {
                        name: 'Total Spend',
                        data: rows.map((r) => r.totalSpend),
                    },
                ],
            },
        };
    }
    async supplierPerformance(query) {
        const where = {
            isEnabled: true,
            createdAt: { gte: query.startDate, lte: query.endDate },
        };
        if (query.supplierIds?.length) {
            where.supplierId = { in: query.supplierIds };
        }
        const stocks = await this.prisma.stock.findMany({
            where,
            include: {
                supplier: true,
                productVariant: {
                    include: { product: true },
                },
            },
        });
        const supplierMap = new Map();
        for (const stock of stocks) {
            const key = stock.supplierId;
            const existing = supplierMap.get(key);
            const value = stock.totalPurchasedUnits *
                (stock.purchasePrice +
                    stock.transportationFree +
                    stock.taxFee +
                    stock.miscellaneousFee);
            if (existing) {
                existing.totalUnits += stock.totalPurchasedUnits;
                existing.totalValue += value;
                existing.uniqueProducts.add(stock.productVariantId);
                existing.batchCount++;
            }
            else {
                supplierMap.set(key, {
                    supplierId: key,
                    supplierName: stock.supplier.title,
                    totalUnits: stock.totalPurchasedUnits,
                    totalValue: value,
                    uniqueProducts: new Set([stock.productVariantId]),
                    batchCount: 1,
                });
            }
        }
        const rows = Array.from(supplierMap.values())
            .map((r) => ({
            supplierId: r.supplierId,
            supplierName: r.supplierName,
            totalUnits: r.totalUnits,
            totalValue: this.round(r.totalValue),
            uniqueProducts: r.uniqueProducts.size,
            batchCount: r.batchCount,
        }))
            .sort((a, b) => b.totalValue - a.totalValue);
        return {
            summary: {
                totalSuppliers: rows.length,
                totalUnitsSupplied: rows.reduce((s, r) => s + r.totalUnits, 0),
                totalPurchaseValue: this.round(rows.reduce((s, r) => s + r.totalValue, 0)),
            },
            rows,
            chart: {
                categories: rows.slice(0, 10).map((r) => r.supplierName),
                series: [
                    {
                        name: 'Total Value',
                        data: rows.slice(0, 10).map((r) => r.totalValue),
                    },
                    {
                        name: 'Total Units',
                        data: rows.slice(0, 10).map((r) => r.totalUnits),
                    },
                ],
            },
        };
    }
    round(value) {
        return Math.round(value * 100) / 100;
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportService);
//# sourceMappingURL=report.service.js.map
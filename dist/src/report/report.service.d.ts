import { PrismaService } from '../prisma.service';
export declare class ReportService {
    private prisma;
    constructor(prisma: PrismaService);
    inventoryStatus(query: {
        startDate: Date;
        endDate: Date;
        locationIds?: string[];
        productVariantIds?: string[];
    }): Promise<{
        summary: {
            totalProducts: number;
            totalItems: number;
            totalValue: number;
        };
        rows: {
            productVariantId: string;
            productName: string;
            variantCode: string;
            attributes: string;
            totalPurchased: number;
            totalRemaining: number;
            totalValue: number;
            locations: string[];
        }[];
        chart: {
            categories: string[];
            series: {
                name: string;
                data: number[];
            }[];
        };
    }>;
    salesReport(query: {
        startDate: Date;
        endDate: Date;
        customerIds?: string[];
        productVariantIds?: string[];
    }): Promise<{
        summary: {
            totalRevenue: number;
            totalQuantity: number;
            totalOrders: number;
            uniqueProducts: number;
        };
        rows: {
            totalRevenue: number;
            productVariantId: string;
            productName: string;
            variantCode: string;
            attributes: string;
            totalQuantity: number;
            orderCount: number;
        }[];
        chart: {
            categories: string[];
            series: {
                name: string;
                data: number[];
            }[];
        };
    }>;
    inventoryValuation(query: {
        startDate: Date;
        endDate: Date;
        locationIds?: string[];
    }): Promise<{
        summary: {
            totalCost: number;
            totalRetailValue: number;
            potentialProfit: number;
            totalProducts: number;
        };
        rows: {
            purchaseCost: number;
            transportCost: number;
            taxCost: number;
            miscCost: number;
            totalCost: number;
            retailValue: number;
            productVariantId: string;
            productName: string;
            variantCode: string;
            attributes: string;
            remainingUnits: number;
        }[];
        chart: {
            categories: string[];
            series: {
                name: string;
                data: number[];
            }[];
        };
    }>;
    stockMovement(query: {
        startDate: Date;
        endDate: Date;
        productVariantIds?: string[];
        locationIds?: string[];
    }): Promise<{
        summary: {
            totalInflow: number;
            totalFulfilled: number;
            totalDiscarded: number;
            netMovement: number;
        };
        rows: {
            net: number;
            productVariantId: string;
            productName: string;
            variantCode: string;
            attributes: string;
            inflow: number;
            fulfilled: number;
            discarded: number;
        }[];
        chart: {
            categories: string[];
            series: {
                name: string;
                data: number[];
            }[];
        };
    }>;
    topCustomers(query: {
        startDate: Date;
        endDate: Date;
        limit?: number;
    }): Promise<{
        summary: {
            totalCustomers: number;
            topCustomerSpend: number;
            totalRevenue: number;
        };
        rows: {
            totalSpend: number;
            customerId: string;
            customerName: string;
            phoneNumber: string;
            totalQuantity: number;
            orderCount: number;
        }[];
        chart: {
            categories: string[];
            series: {
                name: string;
                data: number[];
            }[];
        };
    }>;
    supplierPerformance(query: {
        startDate: Date;
        endDate: Date;
        supplierIds?: string[];
    }): Promise<{
        summary: {
            totalSuppliers: number;
            totalUnitsSupplied: number;
            totalPurchaseValue: number;
        };
        rows: {
            supplierId: string;
            supplierName: string;
            totalUnits: number;
            totalValue: number;
            uniqueProducts: number;
            batchCount: number;
        }[];
        chart: {
            categories: string[];
            series: {
                name: string;
                data: number[];
            }[];
        };
    }>;
    private round;
}

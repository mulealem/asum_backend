import { PrismaService } from '../prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getOverview(): Promise<{
        summary: {
            totalSales: number;
            totalProfit: number;
            totalProductsSold: number;
            totalCustomers: number;
            trends: {
                sales: number;
                profit: number;
                productsSold: number;
                customers: number;
            };
        };
        charts: {
            categories: string[];
            revenue: number[];
            profit: number[];
        };
        topCustomers: {
            spend: number;
            customerId: string;
            name: string;
            quantity: number;
            orders: number;
        }[];
    }>;
    private calculateTrend;
    private buildChartBuckets;
    private toDayKey;
    private roundAmount;
}

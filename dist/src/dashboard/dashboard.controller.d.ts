import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    overview(): Promise<{
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
}

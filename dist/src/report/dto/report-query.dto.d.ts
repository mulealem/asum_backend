import { z } from 'zod';
export declare const BaseReportQuerySchema: z.ZodObject<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    startDate?: Date;
    endDate?: Date;
}, {
    startDate?: Date;
    endDate?: Date;
}>;
export declare const InventoryStatusQuerySchema: z.ZodObject<z.objectUtil.extendShape<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, {
    locationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    productVariantIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}>, "strip", z.ZodTypeAny, {
    productVariantIds?: string[];
    locationIds?: string[];
    startDate?: Date;
    endDate?: Date;
}, {
    productVariantIds?: string[];
    locationIds?: string[];
    startDate?: Date;
    endDate?: Date;
}>;
export declare const SalesReportQuerySchema: z.ZodObject<z.objectUtil.extendShape<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, {
    customerIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    productVariantIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}>, "strip", z.ZodTypeAny, {
    productVariantIds?: string[];
    customerIds?: string[];
    startDate?: Date;
    endDate?: Date;
}, {
    productVariantIds?: string[];
    customerIds?: string[];
    startDate?: Date;
    endDate?: Date;
}>;
export declare const InventoryValuationQuerySchema: z.ZodObject<z.objectUtil.extendShape<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, {
    locationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}>, "strip", z.ZodTypeAny, {
    locationIds?: string[];
    startDate?: Date;
    endDate?: Date;
}, {
    locationIds?: string[];
    startDate?: Date;
    endDate?: Date;
}>;
export declare const StockMovementQuerySchema: z.ZodObject<z.objectUtil.extendShape<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, {
    productVariantIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    locationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}>, "strip", z.ZodTypeAny, {
    productVariantIds?: string[];
    locationIds?: string[];
    startDate?: Date;
    endDate?: Date;
}, {
    productVariantIds?: string[];
    locationIds?: string[];
    startDate?: Date;
    endDate?: Date;
}>;
export declare const TopCustomersQuerySchema: z.ZodObject<z.objectUtil.extendShape<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, {
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}>, "strip", z.ZodTypeAny, {
    startDate?: Date;
    endDate?: Date;
    limit?: number;
}, {
    startDate?: Date;
    endDate?: Date;
    limit?: number;
}>;
export declare const SupplierPerformanceQuerySchema: z.ZodObject<z.objectUtil.extendShape<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, {
    supplierIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}>, "strip", z.ZodTypeAny, {
    supplierIds?: string[];
    startDate?: Date;
    endDate?: Date;
}, {
    supplierIds?: string[];
    startDate?: Date;
    endDate?: Date;
}>;

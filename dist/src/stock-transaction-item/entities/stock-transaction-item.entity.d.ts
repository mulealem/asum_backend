import { z } from 'zod';
export declare class StockTransactionItem {
    stockId: string;
    quantity: number;
    createdAt: Date;
    isEnabled: boolean;
    enableRemark: string;
    enabledById: string;
    disableRemark: string;
    disabledById: string;
    disabledDate: Date;
}
export declare const StockTransactionItemSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    stockIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    quantity: z.ZodOptional<z.ZodNumber>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enableRemark: z.ZodOptional<z.ZodString>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disableRemark: z.ZodOptional<z.ZodString>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    enableRemark?: string;
    disableRemark?: string;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    quantity?: number;
    stockIds?: string[];
}, {
    isEnabled?: boolean;
    enableRemark?: string;
    disableRemark?: string;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    quantity?: number;
    stockIds?: string[];
}>;

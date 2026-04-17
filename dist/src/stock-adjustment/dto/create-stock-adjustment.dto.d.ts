import { z } from 'zod';
export declare class CreateStockAdjustmentDto {
    stockId: string;
    adjustReasonId: string;
    quantity: number;
    remark: string;
    enabledById: string | null;
}
export declare const CreateStockAdjustmentSchema: z.ZodObject<{
    stockId: z.ZodString;
    adjustReasonId: z.ZodString;
    quantity: z.ZodNumber;
    remark: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    remark?: string;
    stockId?: string;
    quantity?: number;
    adjustReasonId?: string;
}, {
    remark?: string;
    stockId?: string;
    quantity?: number;
    adjustReasonId?: string;
}>;

import { z } from 'zod';
export declare class UpdatePurchaseRequestItemDto {
    requestedQuantity?: number;
    expectedUnitPrice?: number;
    currency?: string;
    remark?: string;
}
export declare const UpdatePurchaseRequestItemSchema: z.ZodObject<{
    requestedQuantity: z.ZodOptional<z.ZodNumber>;
    expectedUnitPrice: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodString>;
    remark: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency?: string;
    remark?: string;
    requestedQuantity?: number;
    expectedUnitPrice?: number;
}, {
    currency?: string;
    remark?: string;
    requestedQuantity?: number;
    expectedUnitPrice?: number;
}>;

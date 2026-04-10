import { z } from 'zod';
export declare class CreatePurchaseRequestItemDto {
    purchaseRequestId: string;
    productVariantId: string;
    requestedQuantity: number;
    expectedUnitPrice: number;
    currency: string;
    remark: string;
    enabledById: string | null;
}
export declare const CreatePurchaseRequestItemSchema: z.ZodObject<{
    purchaseRequestId: z.ZodString;
    productVariantId: z.ZodString;
    requestedQuantity: z.ZodNumber;
    expectedUnitPrice: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodString>;
    remark: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    productVariantId?: string;
    currency?: string;
    remark?: string;
    requestedQuantity?: number;
    expectedUnitPrice?: number;
    purchaseRequestId?: string;
}, {
    productVariantId?: string;
    currency?: string;
    remark?: string;
    requestedQuantity?: number;
    expectedUnitPrice?: number;
    purchaseRequestId?: string;
}>;

import { PurchaseRequestStatus } from '@prisma/client';
import { z } from 'zod';
export declare class CreatePurchaseRequestDto {
    supplierId: string;
    status: PurchaseRequestStatus;
    remark: string;
    expectedDeliveryDate: Date;
    enabledById: string | null;
    items: {
        productVariantId: string;
        requestedQuantity: number;
        expectedUnitPrice: number;
        currency: string;
        remark: string;
    }[];
}
export declare const CreatePurchaseRequestSchema: z.ZodObject<{
    supplierId: z.ZodString;
    status: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, string, string>, z.ZodNativeEnum<{
        DRAFT: "DRAFT";
        PENDING_APPROVAL: "PENDING_APPROVAL";
        APPROVED: "APPROVED";
        ORDERED: "ORDERED";
        PARTIALLY_RECEIVED: "PARTIALLY_RECEIVED";
        RECEIVED: "RECEIVED";
        REJECTED: "REJECTED";
        CANCELLED: "CANCELLED";
    }>>;
    remark: z.ZodOptional<z.ZodString>;
    expectedDeliveryDate: z.ZodOptional<z.ZodDate>;
    items: z.ZodArray<z.ZodObject<{
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
    }, {
        productVariantId?: string;
        currency?: string;
        remark?: string;
        requestedQuantity?: number;
        expectedUnitPrice?: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status?: "PENDING_APPROVAL" | "CANCELLED" | "DRAFT" | "APPROVED" | "ORDERED" | "PARTIALLY_RECEIVED" | "RECEIVED" | "REJECTED";
    supplierId?: string;
    remark?: string;
    items?: {
        productVariantId?: string;
        currency?: string;
        remark?: string;
        requestedQuantity?: number;
        expectedUnitPrice?: number;
    }[];
    expectedDeliveryDate?: Date;
}, {
    status?: string;
    supplierId?: string;
    remark?: string;
    items?: {
        productVariantId?: string;
        currency?: string;
        remark?: string;
        requestedQuantity?: number;
        expectedUnitPrice?: number;
    }[];
    expectedDeliveryDate?: Date;
}>;

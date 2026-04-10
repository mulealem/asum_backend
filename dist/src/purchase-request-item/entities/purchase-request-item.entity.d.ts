import { z } from 'zod';
export declare class PurchaseRequestItem {
    id: string;
    createdAt: Date;
    purchaseRequestId: string;
    productVariantId: string;
    requestedQuantity: number;
    receivedQuantity: number;
    expectedUnitPrice: number;
    currency: string;
    remark: string;
    isEnabled: boolean;
    enableRemark: string;
    enabledById: string;
    disableRemark: string;
    disabledById: string;
    disabledDate: Date;
}
export declare const PurchaseRequestItemParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    purchaseRequestIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    productVariantIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    productVariantIds?: string[];
    purchaseRequestIds?: string[];
}, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    productVariantIds?: string[];
    purchaseRequestIds?: string[];
}>;

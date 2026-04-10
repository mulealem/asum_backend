import { z } from 'zod';
export declare class PurchaseRequest {
    id: string;
    createdAt: Date;
    purchaseRequestNumber: number;
    supplierId: string;
    status: string;
    remark: string;
    expectedDeliveryDate: Date;
    approvedDate: Date;
    approvedById: string;
    orderedDate: Date;
    receivedDate: Date;
    isEnabled: boolean;
    enableRemark: string;
    enabledById: string;
    disableRemark: string;
    disabledById: string;
    disabledDate: Date;
}
export declare const PurchaseRequestParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    supplierIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodOptional<z.ZodString>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
    purchaseRequestNumber: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status?: string;
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    supplierIds?: string[];
    purchaseRequestNumber?: number;
}, {
    status?: string;
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    supplierIds?: string[];
    purchaseRequestNumber?: number;
}>;

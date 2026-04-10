import { z } from 'zod';
export declare class ShipmentItem {
    id: string;
    createdAt: string;
    shipmentId: string;
    orderItemFulfillmentId: string;
    stockId: string;
    quantity: number;
    isEnabled: boolean;
    enabledById: string;
    disabledById: string;
    disabledDate: string;
}
export declare const ShipmentItemParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    shipmentIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    orderItemFulfillmentIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    stockIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
    stockIds?: string[];
    shipmentIds?: string[];
    orderItemFulfillmentIds?: string[];
}, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    stockIds?: string[];
    shipmentIds?: string[];
    orderItemFulfillmentIds?: string[];
}>;

import { z } from 'zod';
export declare class CreateShipmentItemDto {
    shipmentId: string;
    orderItemFulfillmentId?: string;
    stockId?: string;
    quantity: number;
    enabledById: string | null;
}
export declare const CreateShipmentItemSchema: z.ZodObject<{
    shipmentId: z.ZodString;
    orderItemFulfillmentId: z.ZodOptional<z.ZodString>;
    stockId: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    stockId?: string;
    quantity?: number;
    orderItemFulfillmentId?: string;
    shipmentId?: string;
}, {
    stockId?: string;
    quantity?: number;
    orderItemFulfillmentId?: string;
    shipmentId?: string;
}>;

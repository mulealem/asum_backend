import { z } from 'zod';
export declare const CreateShipmentWithItemsSchema: z.ZodObject<{
    carrierId: z.ZodString;
    fromLocationId: z.ZodOptional<z.ZodString>;
    toLocationId: z.ZodOptional<z.ZodString>;
    shipmentNumber: z.ZodDefault<z.ZodString>;
    shipmentScheduledDate: z.ZodDate;
    expectedArrivalDate: z.ZodDate;
    note: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        orderItemFulfillmentId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity?: number;
        orderItemFulfillmentId?: string;
    }, {
        quantity?: number;
        orderItemFulfillmentId?: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items?: {
        quantity?: number;
        orderItemFulfillmentId?: string;
    }[];
    carrierId?: string;
    fromLocationId?: string;
    toLocationId?: string;
    shipmentNumber?: string;
    shipmentScheduledDate?: Date;
    expectedArrivalDate?: Date;
    note?: string;
}, {
    items?: {
        quantity?: number;
        orderItemFulfillmentId?: string;
    }[];
    carrierId?: string;
    fromLocationId?: string;
    toLocationId?: string;
    shipmentNumber?: string;
    shipmentScheduledDate?: Date;
    expectedArrivalDate?: Date;
    note?: string;
}>;
export type CreateShipmentWithItemsDto = z.infer<typeof CreateShipmentWithItemsSchema>;

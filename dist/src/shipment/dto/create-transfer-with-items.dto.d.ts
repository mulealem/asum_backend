import { z } from 'zod';
export declare const CreateTransferWithItemsSchema: z.ZodObject<{
    carrierId: z.ZodString;
    fromLocationId: z.ZodString;
    toLocationId: z.ZodString;
    shipmentNumber: z.ZodDefault<z.ZodString>;
    shipmentScheduledDate: z.ZodDate;
    expectedArrivalDate: z.ZodDate;
    note: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        stockId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stockId?: string;
        quantity?: number;
    }, {
        stockId?: string;
        quantity?: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items?: {
        stockId?: string;
        quantity?: number;
    }[];
    note?: string;
    carrierId?: string;
    fromLocationId?: string;
    toLocationId?: string;
    shipmentNumber?: string;
    shipmentScheduledDate?: Date;
    expectedArrivalDate?: Date;
}, {
    items?: {
        stockId?: string;
        quantity?: number;
    }[];
    note?: string;
    carrierId?: string;
    fromLocationId?: string;
    toLocationId?: string;
    shipmentNumber?: string;
    shipmentScheduledDate?: Date;
    expectedArrivalDate?: Date;
}>;
export type CreateTransferWithItemsDto = z.infer<typeof CreateTransferWithItemsSchema>;

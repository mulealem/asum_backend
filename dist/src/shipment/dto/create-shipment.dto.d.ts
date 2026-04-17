import { z } from 'zod';
export declare class CreateShipmentDto {
    carrierId: string;
    fromLocationId?: string;
    toLocationId?: string;
    shipmentNumber: string;
    shipmentScheduledDate: string;
    expectedArrivalDate: string;
    note?: string;
    type?: 'ORDER' | 'TRANSFER';
    enabledById: string | null;
}
export declare const CreateShipmentSchema: z.ZodObject<{
    carrierId: z.ZodString;
    fromLocationId: z.ZodOptional<z.ZodString>;
    toLocationId: z.ZodOptional<z.ZodString>;
    shipmentNumber: z.ZodDefault<z.ZodString>;
    shipmentScheduledDate: z.ZodDate;
    expectedArrivalDate: z.ZodDate;
    note: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<["ORDER", "TRANSFER"]>>;
}, "strip", z.ZodTypeAny, {
    type?: "ORDER" | "TRANSFER";
    note?: string;
    carrierId?: string;
    fromLocationId?: string;
    toLocationId?: string;
    shipmentNumber?: string;
    shipmentScheduledDate?: Date;
    expectedArrivalDate?: Date;
}, {
    type?: "ORDER" | "TRANSFER";
    note?: string;
    carrierId?: string;
    fromLocationId?: string;
    toLocationId?: string;
    shipmentNumber?: string;
    shipmentScheduledDate?: Date;
    expectedArrivalDate?: Date;
}>;

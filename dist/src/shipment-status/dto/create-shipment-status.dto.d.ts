import { z } from 'zod';
export declare class CreateShipmentStatusDto {
    shipmentId: string;
    statusId: string;
    enabledById: string | null;
}
export declare const CreateShipmentStatusSchema: z.ZodObject<{
    shipmentId: z.ZodString;
    statusId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    shipmentId?: string;
    statusId?: string;
}, {
    shipmentId?: string;
    statusId?: string;
}>;

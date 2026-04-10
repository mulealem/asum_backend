import { z } from 'zod';
export declare class CreateShipmentItemStatusDto {
    shipmentItemId: string;
    statusId: string;
    enabledById: string | null;
}
export declare const CreateShipmentItemStatusSchema: z.ZodObject<{
    shipmentItemId: z.ZodString;
    statusId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    statusId?: string;
    shipmentItemId?: string;
}, {
    statusId?: string;
    shipmentItemId?: string;
}>;

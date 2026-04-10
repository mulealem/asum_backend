import { z } from 'zod';
export declare class CreateOrderItemFulfillmentDto {
    orderItemId: string;
    stockId: string;
    fulfilledQuantity: number;
    enabledById: string | null;
}
export declare const CreateOrderItemFulfillmentSchema: z.ZodObject<{
    orderItemId: z.ZodString;
    stockId: z.ZodString;
    fulfilledQuantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    fulfilledQuantity?: number;
    stockId?: string;
    orderItemId?: string;
}, {
    fulfilledQuantity?: number;
    stockId?: string;
    orderItemId?: string;
}>;

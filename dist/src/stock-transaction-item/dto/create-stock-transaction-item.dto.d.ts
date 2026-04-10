import { z } from 'zod';
export declare class CreateStockTransactionItemDto {
    stockId: string;
    quantity: number;
    enabledById?: string | null;
}
export declare const CreateStockTransactionItemSchema: z.ZodObject<{
    stockId: z.ZodString;
    quantity: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    stockId?: string;
    quantity?: number;
}, {
    stockId?: string;
    quantity?: number;
}>;

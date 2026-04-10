import { z } from 'zod';
export declare class CreateDiscardedStockDto {
    stockId: string;
    discardedReasonId: string;
    quantity: number;
    enabledById: string | null;
}
export declare const CreateDiscardedStockSchema: z.ZodObject<{
    stockId: z.ZodString;
    discardedReasonId: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    stockId?: string;
    quantity?: number;
    discardedReasonId?: string;
}, {
    stockId?: string;
    quantity?: number;
    discardedReasonId?: string;
}>;

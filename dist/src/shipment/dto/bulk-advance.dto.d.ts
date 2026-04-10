import { z } from 'zod';
export declare const BulkAdvanceSchema: z.ZodObject<{
    ids: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    ids?: string[];
}, {
    ids?: string[];
}>;
export type BulkAdvanceDto = z.infer<typeof BulkAdvanceSchema>;

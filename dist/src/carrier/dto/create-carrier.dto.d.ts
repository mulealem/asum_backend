import { z } from 'zod';
export declare class CreateCarrierDto {
    title: string;
    identifier: string;
    description: string;
    carrierTypeId: string;
    enabledById: string | null;
}
export declare const CreateCarrierSchema: z.ZodObject<{
    title: z.ZodString;
    identifier: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    carrierTypeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title?: string;
    description?: string;
    identifier?: string;
    carrierTypeId?: string;
}, {
    title?: string;
    description?: string;
    identifier?: string;
    carrierTypeId?: string;
}>;

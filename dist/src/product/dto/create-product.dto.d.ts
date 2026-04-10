import { z } from 'zod';
export declare class CreateProductDto {
    typeOfProductId: string;
    title: string;
    abbreviation: string;
    description: string;
    enabledById: string | null;
}
export declare const CreateProductSchema: z.ZodObject<{
    typeOfProductId: z.ZodString;
    title: z.ZodString;
    abbreviation: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    abbreviation?: string;
    description?: string;
    typeOfProductId?: string;
}, {
    title?: string;
    abbreviation?: string;
    description?: string;
    typeOfProductId?: string;
}>;

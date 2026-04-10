import { z } from 'zod';
export declare class CreateBankDto {
    title: string;
    abbreviation: string;
    description: string;
    enabledById: string | null;
}
export declare const CreateBankSchema: z.ZodObject<{
    title: z.ZodString;
    abbreviation: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    abbreviation?: string;
    description?: string;
}, {
    title?: string;
    abbreviation?: string;
    description?: string;
}>;

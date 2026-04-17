import { z } from 'zod';
export declare class CreateTaxDto {
    name: string;
    abbreviation: string;
    rate: number;
    type: string;
    description: string;
    enabledById: string | null;
}
export declare const CreateTaxSchema: z.ZodObject<{
    name: z.ZodString;
    abbreviation: z.ZodOptional<z.ZodString>;
    rate: z.ZodNumber;
    type: z.ZodDefault<z.ZodEnum<["SALES", "PURCHASE", "ALL"]>>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    abbreviation?: string;
    description?: string;
    type?: "SALES" | "PURCHASE" | "ALL";
    name?: string;
    rate?: number;
}, {
    abbreviation?: string;
    description?: string;
    type?: "SALES" | "PURCHASE" | "ALL";
    name?: string;
    rate?: number;
}>;

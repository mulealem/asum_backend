import { z } from 'zod';
export declare class Tax {
    id: string;
    name: string;
    abbreviation: string;
    rate: number;
    type: string;
    description: string;
    isEnabled: boolean;
    enabledById: string;
    disabledById: string;
    disabledDate: Date;
}
export declare const TaxParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    name: z.ZodOptional<z.ZodString>;
    abbreviation: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["SALES", "PURCHASE", "ALL"]>>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    abbreviation?: string;
    type?: "SALES" | "PURCHASE" | "ALL";
    isEnabled?: boolean;
    name?: string;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
}, {
    abbreviation?: string;
    type?: "SALES" | "PURCHASE" | "ALL";
    isEnabled?: boolean;
    name?: string;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
}>;

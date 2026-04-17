import { z } from 'zod';
export declare const ProformaParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    proformaTo: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SENT", "ACCEPTED", "CONVERTED", "CANCELLED"]>>;
    customerId: z.ZodOptional<z.ZodString>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "CANCELLED" | "DRAFT" | "SENT" | "ACCEPTED" | "CONVERTED";
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    customerId?: string;
    proformaTo?: string;
}, {
    status?: "CANCELLED" | "DRAFT" | "SENT" | "ACCEPTED" | "CONVERTED";
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    customerId?: string;
    proformaTo?: string;
}>;

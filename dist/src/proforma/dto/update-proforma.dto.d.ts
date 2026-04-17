import { z } from 'zod';
export declare const UpdateProformaSchema: z.ZodObject<{
    proformaTo: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodDate>;
    customerId: z.ZodOptional<z.ZodString>;
    vatRate: z.ZodOptional<z.ZodNumber>;
    withholdingRate: z.ZodOptional<z.ZodNumber>;
    remark: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    customerId?: string;
    remark?: string;
    date?: Date;
    proformaTo?: string;
    vatRate?: number;
    withholdingRate?: number;
}, {
    customerId?: string;
    remark?: string;
    date?: Date;
    proformaTo?: string;
    vatRate?: number;
    withholdingRate?: number;
}>;
export type UpdateProformaDto = z.infer<typeof UpdateProformaSchema>;

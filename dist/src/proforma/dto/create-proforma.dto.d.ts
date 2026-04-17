import { z } from 'zod';
export declare const CreateProformaSchema: z.ZodObject<{
    proformaTo: z.ZodString;
    date: z.ZodOptional<z.ZodDate>;
    customerId: z.ZodOptional<z.ZodString>;
    vatRate: z.ZodDefault<z.ZodNumber>;
    withholdingRate: z.ZodDefault<z.ZodNumber>;
    remark: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        productVariantId: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        currency: z.ZodDefault<z.ZodString>;
        remark: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        productVariantId?: string;
        currency?: string;
        remark?: string;
        quantity?: number;
        unitPrice?: number;
    }, {
        productVariantId?: string;
        currency?: string;
        remark?: string;
        quantity?: number;
        unitPrice?: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    customerId?: string;
    remark?: string;
    date?: Date;
    items?: {
        productVariantId?: string;
        currency?: string;
        remark?: string;
        quantity?: number;
        unitPrice?: number;
    }[];
    proformaTo?: string;
    vatRate?: number;
    withholdingRate?: number;
}, {
    customerId?: string;
    remark?: string;
    date?: Date;
    items?: {
        productVariantId?: string;
        currency?: string;
        remark?: string;
        quantity?: number;
        unitPrice?: number;
    }[];
    proformaTo?: string;
    vatRate?: number;
    withholdingRate?: number;
}>;
export type CreateProformaDto = z.infer<typeof CreateProformaSchema>;

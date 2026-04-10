import { z } from 'zod';
export declare class CreateProductVariantPriceDto {
    listPrice: number;
    currency: string;
    tag: string;
    productVariantId: string;
    enabledById: string | null;
}
export declare const CreateProductVariantPriceSchema: z.ZodObject<{
    listPrice: z.ZodNumber;
    currency: z.ZodString;
    tag: z.ZodOptional<z.ZodString>;
    productVariantId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    productVariantId?: string;
    listPrice?: number;
    currency?: string;
    tag?: string;
}, {
    productVariantId?: string;
    listPrice?: number;
    currency?: string;
    tag?: string;
}>;

import { z } from 'zod';
export declare class CreateProductVariantDto {
    productId: string;
    code: string;
    brandId: string;
    enabledById: string | null;
}
export declare const CreateProductVariantSchema: z.ZodObject<{
    productId: z.ZodString;
    code: z.ZodString;
    brandId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code?: string;
    productId?: string;
    brandId?: string;
}, {
    code?: string;
    productId?: string;
    brandId?: string;
}>;

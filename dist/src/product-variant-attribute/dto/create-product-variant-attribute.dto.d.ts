import { z } from 'zod';
export declare class CreateProductVariantAttributeDto {
    productVariantId: string;
    key: string;
    value: string;
    enabledById: string | null;
}
export declare const CreateProductVariantAttributeSchema: z.ZodObject<{
    productVariantId: z.ZodString;
    key: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value?: string;
    productVariantId?: string;
    key?: string;
}, {
    value?: string;
    productVariantId?: string;
    key?: string;
}>;

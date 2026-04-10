import { ProductVariant } from '../../product-variant/entities/product-variant.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class ProductVariantPrice {
    listPrice: number;
    currency: string;
    tag: string;
    productVariantId: string;
    productVariant: ProductVariant;
    isEnabled: boolean;
    enabledById: string;
    enabledBy: User;
    disabledById: string;
    disabledBy: User;
    disabledDate: Date;
}
export declare const ProductVariantPriceParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    listPrice: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    productVariantIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    listPrice?: number;
    currency?: string;
    productVariantIds?: string[];
    tags?: string[];
}, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    listPrice?: number;
    currency?: string;
    productVariantIds?: string[];
    tags?: string[];
}>;

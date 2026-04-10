import { ProductVariant } from '../../product-variant/entities/product-variant.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class ProductVariantAttribute {
    productVariantId: string;
    productVariant: ProductVariant;
    key: string;
    value: string;
    isEnabled: boolean;
    enabledById: string;
    enabledBy: User;
    disabledById: string;
    disabledBy: User;
    disabledDate: Date;
}
export declare const ProductVariantAttributeParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    productVariantIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    key: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodString>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value?: string;
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    key?: string;
    productVariantIds?: string[];
}, {
    value?: string;
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    key?: string;
    productVariantIds?: string[];
}>;

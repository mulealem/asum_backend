import { TypeOfProduct } from '../../type-of-product/entities/type-of-product.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class Product {
    typeOfProductId: string;
    typeOfProduct: TypeOfProduct;
    title: string;
    abbreviation: string;
    description: string;
    isEnabled: boolean;
    enabledById: string;
    enabledBy: User;
    disabledById: string;
    disabledBy: User;
    disabledDate: Date;
}
export declare const ProductParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    typeOfProductIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    title: z.ZodOptional<z.ZodString>;
    abbreviation: z.ZodOptional<z.ZodString>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    abbreviation?: string;
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    typeOfProductIds?: string[];
}, {
    title?: string;
    abbreviation?: string;
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    typeOfProductIds?: string[];
}>;

import { z } from 'zod';
export declare const CheckoutOrderSchema: z.ZodEffects<z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        phoneNumber: z.ZodString;
        tin: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        phoneNumber?: string;
        tin?: string;
        address?: string;
    }, {
        name?: string;
        phoneNumber?: string;
        tin?: string;
        address?: string;
    }>>;
    order: z.ZodObject<{
        paymentOptionId: z.ZodString;
        expectedBankAccountId: z.ZodOptional<z.ZodString>;
        paymentOptionRefernce: z.ZodOptional<z.ZodString>;
        remark: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        paymentOptionId?: string;
        paymentOptionRefernce?: string;
        expectedBankAccountId?: string;
        remark?: string;
    }, {
        paymentOptionId?: string;
        paymentOptionRefernce?: string;
        expectedBankAccountId?: string;
        remark?: string;
    }>;
    items: z.ZodArray<z.ZodObject<{
        productVariantId: z.ZodString;
        productVariantPriceId: z.ZodString;
        purchasedQuantity: z.ZodNumber;
        price: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        productVariantId?: string;
        currency?: string;
        purchasedQuantity?: number;
        productVariantPriceId?: string;
        price?: number;
    }, {
        productVariantId?: string;
        currency?: string;
        purchasedQuantity?: number;
        productVariantPriceId?: string;
        price?: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    customer?: {
        name?: string;
        phoneNumber?: string;
        tin?: string;
        address?: string;
    };
    order?: {
        paymentOptionId?: string;
        paymentOptionRefernce?: string;
        expectedBankAccountId?: string;
        remark?: string;
    };
    customerId?: string;
    items?: {
        productVariantId?: string;
        currency?: string;
        purchasedQuantity?: number;
        productVariantPriceId?: string;
        price?: number;
    }[];
}, {
    customer?: {
        name?: string;
        phoneNumber?: string;
        tin?: string;
        address?: string;
    };
    order?: {
        paymentOptionId?: string;
        paymentOptionRefernce?: string;
        expectedBankAccountId?: string;
        remark?: string;
    };
    customerId?: string;
    items?: {
        productVariantId?: string;
        currency?: string;
        purchasedQuantity?: number;
        productVariantPriceId?: string;
        price?: number;
    }[];
}>, {
    customer?: {
        name?: string;
        phoneNumber?: string;
        tin?: string;
        address?: string;
    };
    order?: {
        paymentOptionId?: string;
        paymentOptionRefernce?: string;
        expectedBankAccountId?: string;
        remark?: string;
    };
    customerId?: string;
    items?: {
        productVariantId?: string;
        currency?: string;
        purchasedQuantity?: number;
        productVariantPriceId?: string;
        price?: number;
    }[];
}, {
    customer?: {
        name?: string;
        phoneNumber?: string;
        tin?: string;
        address?: string;
    };
    order?: {
        paymentOptionId?: string;
        paymentOptionRefernce?: string;
        expectedBankAccountId?: string;
        remark?: string;
    };
    customerId?: string;
    items?: {
        productVariantId?: string;
        currency?: string;
        purchasedQuantity?: number;
        productVariantPriceId?: string;
        price?: number;
    }[];
}>;
export type CheckoutOrderDto = z.infer<typeof CheckoutOrderSchema>;

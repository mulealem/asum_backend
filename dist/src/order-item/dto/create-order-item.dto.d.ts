import { z } from 'zod';
export declare class CreateOrderItemDto {
    purchasedQuantity: number;
    isApproved: boolean;
    approvedById: string;
    productVariantId: string;
    productVariantPriceId: string;
    orderId: string;
    price: number;
    currency: string;
    isPartiallyFulfilled: boolean;
    fulfilledQuantity: number;
    isFullyFulfilled: boolean;
    isPartiallyShipped: boolean;
    shippedQuantity: number;
    isFullyShipped: boolean;
    enabledById: string | null;
}
export declare const CreateOrderItemSchema: z.ZodObject<{
    purchasedQuantity: z.ZodNumber;
    isApproved: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    approvedById: z.ZodOptional<z.ZodString>;
    productVariantId: z.ZodString;
    productVariantPriceId: z.ZodString;
    orderId: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodString;
    isPartiallyFulfilled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    fulfilledQuantity: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    isFullyFulfilled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    productVariantId?: string;
    currency?: string;
    isPartiallyFulfilled?: boolean;
    isFullyFulfilled?: boolean;
    purchasedQuantity?: number;
    isApproved?: boolean;
    approvedById?: string;
    productVariantPriceId?: string;
    orderId?: string;
    price?: number;
    fulfilledQuantity?: number;
}, {
    productVariantId?: string;
    currency?: string;
    isPartiallyFulfilled?: boolean;
    isFullyFulfilled?: boolean;
    purchasedQuantity?: number;
    isApproved?: boolean;
    approvedById?: string;
    productVariantPriceId?: string;
    orderId?: string;
    price?: number;
    fulfilledQuantity?: number;
}>;

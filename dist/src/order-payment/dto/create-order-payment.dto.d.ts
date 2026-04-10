import { z } from 'zod';
export declare class CreateOrderPaymentDto {
    paidAmount: number;
    orderId: string;
    paymentId: string;
    enabledById: string | null;
}
export declare const CreateOrderPaymentSchema: z.ZodObject<{
    paidAmount: z.ZodNumber;
    orderId: z.ZodString;
    paymentId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orderId?: string;
    paidAmount?: number;
    paymentId?: string;
}, {
    orderId?: string;
    paidAmount?: number;
    paymentId?: string;
}>;

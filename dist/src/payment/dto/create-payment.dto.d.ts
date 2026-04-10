import { z } from 'zod';
export declare class CreatePaymentDto {
    amount: number;
    paymentOptionId: string;
    customerId: string;
    referenceNumber: string;
    bankAccountId: string;
    receiptNumber: string;
    orderPayments: any[];
    enabledById: string | null;
}
export declare const CreatePaymentSchema: z.ZodObject<{
    amount: z.ZodNumber;
    paymentOptionId: z.ZodString;
    customerId: z.ZodString;
    referenceNumber: z.ZodString;
    bankAccountId: z.ZodString;
    orderPayments: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    referenceNumber?: string;
    customerId?: string;
    paymentOptionId?: string;
    amount?: number;
    bankAccountId?: string;
    orderPayments?: {
        orderId?: string;
        paidAmount?: number;
        paymentId?: string;
    }[];
}, {
    referenceNumber?: string;
    customerId?: string;
    paymentOptionId?: string;
    amount?: number;
    bankAccountId?: string;
    orderPayments?: {
        orderId?: string;
        paidAmount?: number;
        paymentId?: string;
    }[];
}>;

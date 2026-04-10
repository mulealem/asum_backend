import { Customer } from '../../customer/entities/customer.entity';
import { PaymentOption } from '../../payment-option/entities/payment-option.entity';
import { z } from 'zod';
export declare class Payment {
    amount: number;
    paymentOptionId: string;
    paymentOption: PaymentOption;
    paymentOptionRefernce: string;
    customerId: string;
    customer: Customer;
    receiptNumber: string;
}
export declare const PaymentParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    amount: z.ZodOptional<z.ZodNumber>;
    paymentOptionIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    paymentOptionRefernce: z.ZodOptional<z.ZodString>;
    customerIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    ids?: string[];
    paymentOptionRefernce?: string;
    customerIds?: string[];
    paymentOptionIds?: string[];
    amount?: number;
}, {
    ids?: string[];
    paymentOptionRefernce?: string;
    customerIds?: string[];
    paymentOptionIds?: string[];
    amount?: number;
}>;

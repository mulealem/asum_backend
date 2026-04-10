import { Order } from '../../order/entities/order.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { z } from 'zod';
export declare class OrderPayment {
    paidAmount: number;
    orderId: string;
    order: Order;
    paymentId: string;
    payment: Payment;
}
export declare const OrderPaymentParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    orderIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    paymentIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    ids?: string[];
    orderIds?: string[];
    paymentIds?: string[];
}, {
    ids?: string[];
    orderIds?: string[];
    paymentIds?: string[];
}>;

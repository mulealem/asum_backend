import { Bank } from '../../bank/entities/bank.entity';
import { Order } from '../../order/entities/order.entity';
import { PaymentOption } from '../../payment-option/entities/payment-option.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { z } from 'zod';

export class OrderPayment {
  paidAmount: number;
  orderId: string;
  order: Order;
  // bankId: string;
  // bank: Bank;
  paymentId: string;
  payment: Payment;
  // paymentOptionId: string;
  // paymentOption: PaymentOption;
  // paymentOptionRefernce: string;
}

export const OrderPaymentParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  orderIds: z.array(z.string().uuid()).optional(),
  // bankIds: z.array(z.string().uuid()).optional(),
  paymentIds: z.array(z.string().uuid()).optional(),
  // paymentOptionIds: z.array(z.string().uuid()).optional(),
  // paymentOptionRefernce: z.string().optional(),
});

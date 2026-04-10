import { Customer } from '../../customer/entities/customer.entity';
import { PaymentOption } from '../../payment-option/entities/payment-option.entity';
import { z } from 'zod';

export class Payment {
  amount: number;
  paymentOptionId: string;
  paymentOption: PaymentOption;
  paymentOptionRefernce: string;
  customerId: string;
  customer: Customer;
  receiptNumber: string;
}

export const PaymentParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  amount: z.number().int().optional(),
  paymentOptionIds: z.array(z.string().uuid()).optional(),
  paymentOptionRefernce: z.string().max(50).optional(),
  customerIds: z.array(z.string().uuid()).optional(),
});

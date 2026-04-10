import { CreateOrderPaymentSchema } from '../../order-payment/dto/create-order-payment.dto';
import { OrderPaymentParameterSchema } from '../../order-payment/entities/order-payment.entity';
import { z } from 'zod';

export class CreatePaymentDto {
  amount: number;
  paymentOptionId: string;
  customerId: string;
  referenceNumber: string;
  bankAccountId: string;
  receiptNumber: string;
  orderPayments: any[];
  enabledById: string | null;
}

export const CreatePaymentSchema = z.object({
  amount: z.number().int(),
  paymentOptionId: z.string().uuid(),
  customerId: z.string().uuid(),
  referenceNumber: z.string().max(50),
  bankAccountId: z.string().uuid(),
  orderPayments: z.array(CreateOrderPaymentSchema).optional(),
});

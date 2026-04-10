import { z } from 'zod';

export class CreateOrderPaymentDto {
  paidAmount: number;
  orderId: string;
  // bankId: string;
  paymentId: string;
  // paymentOptionId: string;
  // paymentOptionRefernce: string;
  enabledById: string | null;
}

export const CreateOrderPaymentSchema = z.object({
  paidAmount: z.number().int(),
  orderId: z.string().uuid(),
  // bankId: z.string().uuid(),
  paymentId: z.string().uuid().optional(),
  // paymentOptionId: z.string().uuid(),
  // paymentOptionRefernce: z.string().max(50),
});

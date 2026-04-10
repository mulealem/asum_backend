import { z } from 'zod';

export class CreateStockTransactionItemDto {
  stockId: string;
  quantity: number;
  enabledById?: string | null;
}

export const CreateStockTransactionItemSchema = z.object({
  stockId: z.string().uuid(),
  quantity: z
    .number()
    .int()
    .refine((value) => value !== 0, {
      message: 'Quantity cannot be zero',
    }),
});

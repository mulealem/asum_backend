import { z } from 'zod';

export class CreateDiscardedStockDto {
  stockId: string;
  discardedReasonId: string;
  quantity: number;
  enabledById: string | null;
}

export const CreateDiscardedStockSchema = z.object({
  stockId: z.string().uuid(),
  discardedReasonId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

import { z } from 'zod';

export class CreateStockAdjustmentDto {
  stockId: string;
  adjustReasonId: string;
  quantity: number;
  remark: string;
  enabledById: string | null;
}

export const CreateStockAdjustmentSchema = z.object({
  stockId: z.string().uuid(),
  adjustReasonId: z.string().uuid(),
  quantity: z.number().int().positive(),
  remark: z.string().max(500).optional(),
});

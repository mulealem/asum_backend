import { z } from 'zod';

export class CreateStockAdjustReasonDto {
  title: string;
  abbreviation: string;
  description: string;
  enabledById: string | null;
}

export const CreateStockAdjustReasonSchema = z.object({
  title: z.string().min(3).max(50),
  abbreviation: z.string().max(20).optional(),
  description: z.string().max(300).optional(),
});

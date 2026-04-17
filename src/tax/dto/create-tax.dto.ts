import { z } from 'zod';

export class CreateTaxDto {
  name: string;
  abbreviation: string;
  rate: number;
  type: string;
  description: string;
  enabledById: string | null;
}

export const CreateTaxSchema = z.object({
  name: z.string().min(1).max(100),
  abbreviation: z.string().max(20).optional(),
  rate: z.number().min(0).max(1),
  type: z.enum(['SALES', 'PURCHASE', 'ALL']).default('ALL'),
  description: z.string().max(300).optional(),
});

import { z } from 'zod';

export class CreateCarrierTypeDto {
  title: string;
  abbreviation: string;
  description: string;
  enabledById: string | null;
}

export const CreateCarrierTypeSchema = z.object({
  title: z.string().min(3).max(50),
  abbreviation: z.string().max(20),
  description: z.string().max(300).optional(),
});

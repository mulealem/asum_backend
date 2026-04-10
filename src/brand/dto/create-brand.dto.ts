import { z } from 'zod';

export class CreateBrandDto {
  title: string;
  abbreviation: string;
  description: string;
  enabledById: string | null;
}

export const CreateBrandSchema = z.object({
  title: z.string().min(3),
  abbreviation: z.string().min(1).max(20),
  description: z.string().max(300).optional(),
});

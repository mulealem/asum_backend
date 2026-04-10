import { z } from 'zod';

export class CreateProductDto {
  typeOfProductId: string;
  title: string;
  abbreviation: string;
  description: string;
  enabledById: string | null;
}

export const CreateProductSchema = z.object({
  typeOfProductId: z.string().min(3).max(50),
  title: z.string().min(3).max(50),
  abbreviation: z.string().max(20),
  description: z.string().max(300).optional(),
});

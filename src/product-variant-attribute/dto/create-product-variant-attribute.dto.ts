import { z } from 'zod';

export class CreateProductVariantAttributeDto {
  productVariantId: string;
  key: string;
  value: string;
  enabledById: string | null;
}

export const CreateProductVariantAttributeSchema = z.object({
  productVariantId: z.string().uuid(),
  key: z.string().min(1).max(50),
  value: z.string().min(1).max(50),
});

import { z } from 'zod';

export class CreateProductVariantDto {
  productId: string;
  code: string;
  brandId: string;
  enabledById: string | null;
}

export const CreateProductVariantSchema = z.object({
  productId: z.string().uuid(),
  code: z.string().max(7),
  brandId: z.string().uuid(),
});

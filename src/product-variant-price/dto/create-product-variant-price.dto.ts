import { z } from 'zod';

export class CreateProductVariantPriceDto {
  listPrice: number;
  currency: string;
  tag: string;
  productVariantId: string;
  enabledById: string | null;
}

export const CreateProductVariantPriceSchema = z.object({
  listPrice: z.number().positive(),
  currency: z.string().max(3),
  tag: z.string().max(50).optional(),
  productVariantId: z.string().uuid(),
});

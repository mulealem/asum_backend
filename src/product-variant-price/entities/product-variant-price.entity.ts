import { ProductVariant } from '../../product-variant/entities/product-variant.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class ProductVariantPrice {
  listPrice: number;
  currency: string;
  tag: string;
  productVariantId: string;
  productVariant: ProductVariant;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const ProductVariantPriceParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  listPrice: z.number().int().optional(),
  currency: z.string().max(3).optional(),
  tags: z.array(z.string()).optional(),
  productVariantIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

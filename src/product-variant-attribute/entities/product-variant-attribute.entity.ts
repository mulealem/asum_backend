import { ProductVariant } from '../../product-variant/entities/product-variant.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class ProductVariantAttribute {
  productVariantId: string;
  productVariant: ProductVariant;
  key: string;
  value: string;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const ProductVariantAttributeParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  productVariantIds: z.array(z.string().uuid()).optional(),
  key: z.string().optional(),
  value: z.string().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

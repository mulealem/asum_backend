import { Brand } from '../../brand/entities/brand.entity';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class ProductVariant {
  productId: string;
  product: Product;
  code: string;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
  brandId: string;
  brand: Brand;
}

export const ProductVariantParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  productIds: z.array(z.string().uuid()).optional(),
  codes: z.array(z.string()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

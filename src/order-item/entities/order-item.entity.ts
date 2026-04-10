import { Order } from '../../order/entities/order.entity';
import { ProductVariantPrice } from '../../product-variant-price/entities/product-variant-price.entity';
import { ProductVariant } from '../../product-variant/entities/product-variant.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class OrderItem {
  purchasedQuantity: number;
  isApproved: boolean;
  approvedById: string;
  approvedBy: User;
  approvedAt: Date;
  productVariantId: string;
  ProductVariant: ProductVariant;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
  productVariantPriceId: string;
  ProductVariantPrice: ProductVariantPrice;
  orderId: string;
  order: Order;
  price: number;
  currency: string;
  isPartiallyFulfilled: boolean;
  fulfilledQuantity: number;
  isFullyFulfilled: boolean;
  isPartiallyShipped: boolean;
  shippedQuantity: number;
  isFullyShipped: boolean;
}

export const OrderItemParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  purchasedQuantity: z.number().int().optional(),
  isApproved: z.boolean().optional(),
  approvedByIds: z.array(z.string().uuid()).optional(),
  approvedStartDate: z.coerce.string().optional(),
  approvedEndDate: z.coerce.string().optional(),
  productVariantIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
  productVariantPriceIds: z.array(z.string().uuid()).optional(),
  orderIds: z.array(z.string().uuid()).optional(),
  price: z.number().int().optional(),
  currency: z.string().max(3).optional(),
  isPartiallyFulfilled: z.boolean().optional(),
  fulfilledQuantity: z.number().int().optional(),
  isFullyFulfilled: z.boolean().optional(),
  isPartiallyShipped: z.boolean().optional(),
  shippedQuantity: z.number().int().optional(),
  isFullyShipped: z.boolean().optional(),
});

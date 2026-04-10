import { z } from 'zod';

export class CreateOrderItemDto {
  purchasedQuantity: number;
  isApproved: boolean;
  approvedById: string;
  productVariantId: string;
  productVariantPriceId: string;
  orderId: string;
  price: number;
  currency: string;
  isPartiallyFulfilled: boolean;
  fulfilledQuantity: number;
  isFullyFulfilled: boolean;
  isPartiallyShipped: boolean;
  shippedQuantity: number;
  isFullyShipped: boolean;
  enabledById: string | null;
}

export const CreateOrderItemSchema = z.object({
  purchasedQuantity: z.number().int(),
  isApproved: z.boolean().optional().default(false),
  approvedById: z.string().uuid().optional(),
  productVariantId: z.string().uuid(),
  productVariantPriceId: z.string().uuid(),
  orderId: z.string().uuid(),
  price: z.number().int(),
  currency: z.string().max(3),
  isPartiallyFulfilled: z.boolean().optional().default(false),
  fulfilledQuantity: z.number().int().optional().default(0),
  isFullyFulfilled: z.boolean().optional().default(false),
});

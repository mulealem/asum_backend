import { z } from 'zod';

export class CreatePurchaseRequestItemDto {
  purchaseRequestId: string;
  productVariantId: string;
  requestedQuantity: number;
  expectedUnitPrice: number;
  currency: string;
  remark: string;
  enabledById: string | null;
}

export const CreatePurchaseRequestItemSchema = z.object({
  purchaseRequestId: z.string().uuid(),
  productVariantId: z.string().uuid(),
  requestedQuantity: z.number().int().min(1),
  expectedUnitPrice: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  remark: z.string().max(300).optional(),
});

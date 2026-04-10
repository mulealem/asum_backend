import { z } from 'zod';

export class UpdatePurchaseRequestItemDto {
  requestedQuantity?: number;
  expectedUnitPrice?: number;
  currency?: string;
  remark?: string;
}

export const UpdatePurchaseRequestItemSchema = z.object({
  requestedQuantity: z.number().int().min(1).optional(),
  expectedUnitPrice: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  remark: z.string().max(300).optional(),
});

import { z } from 'zod';

export class UpdatePurchaseRequestDto {
  supplierId?: string;
  remark?: string;
  expectedDeliveryDate?: Date;
}

export const UpdatePurchaseRequestSchema = z.object({
  supplierId: z.string().uuid().optional(),
  remark: z.string().max(500).optional(),
  expectedDeliveryDate: z.coerce.date().optional(),
});

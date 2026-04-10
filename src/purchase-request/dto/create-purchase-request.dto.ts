import { PurchaseRequestStatus } from '@prisma/client';
import { z } from 'zod';

export class CreatePurchaseRequestDto {
  supplierId: string;
  status: PurchaseRequestStatus;
  remark: string;
  expectedDeliveryDate: Date;
  enabledById: string | null;
  items: {
    productVariantId: string;
    requestedQuantity: number;
    expectedUnitPrice: number;
    currency: string;
    remark: string;
  }[];
}

export const CreatePurchaseRequestSchema = z.object({
  supplierId: z.string().uuid(),
  status: z
    .string()
    .optional()
    .default(PurchaseRequestStatus.DRAFT)
    .transform((value) =>
      value
        .trim()
        .toUpperCase()
        .replace(/[\s-]+/g, '_'),
    )
    .pipe(z.nativeEnum(PurchaseRequestStatus)),
  remark: z.string().max(500).optional(),
  expectedDeliveryDate: z.coerce.date().optional(),
  items: z
    .array(
      z.object({
        productVariantId: z.string().uuid(),
        requestedQuantity: z.number().int().min(1),
        expectedUnitPrice: z.number().min(0).optional(),
        currency: z.string().max(3).optional(),
        remark: z.string().max(300).optional(),
      }),
    )
    .min(1),
});

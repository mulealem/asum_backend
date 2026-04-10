import { z } from 'zod';

export class CreateStockDto {
  productVariantId: string;
  supplierId: string;
  locationId: string;
  batchId: string;
  totalPurchasedUnits: number;
  remainingUnits: number;
  manufacturedDate: Date;
  expirationDate: Date;
  referenceNumber: string;
  receiptNumber: string;
  stockSourceId: string;
  transportationFree: number;
  taxFee: number;
  miscellaneousFee: number;
  purchasePrice: number;
  expectedRetailPrice: number;
  enabledById: string | null;
}

export const CreateStockSchema = z.object({
  productVariantId: z.string().uuid(),
  supplierId: z.string().uuid(),
  locationId: z.string().uuid(),
  batchId: z.string(),
  totalPurchasedUnits: z.number().int().positive(),
  remainingUnits: z.number().int().positive(),
  manufacturedDate: z
    .string()
    .transform((value) => new Date(value))
    .optional(),
  expirationDate: z
    .string()
    .transform((value) => new Date(value))
    .optional(),
  referenceNumber: z.string().max(50).optional(),
  receiptNumber: z.string().max(50).optional(),
  stockSourceId: z.string().uuid(),
  transportationFree: z.number().positive(),
  taxFee: z.number().positive(),
  miscellaneousFee: z.number().positive(),
  purchasePrice: z.number().positive(),
  expectedRetailPrice: z.number().positive(),
});

import { ProductVariant } from '../../product-variant/entities/product-variant.entity';
import { StockSource } from '../../stock-source/entities/stock-source.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class Stock {
  productVariantId: string;
  productVariant: ProductVariant;
  supplierId: string;
  supplier: Supplier;
  locationId: string;
  location: Location;
  batchId: string;
  totalPurchasedUnits: number;
  remainingUnits: number;
  manufacturedDate: Date;
  expirationDate: Date;
  referenceNumber: string;
  receiptNumber: string;
  stockSourceId: string;
  stockSource: StockSource;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
  transportationFree: number;
  taxFee: number;
  miscellaneousFee: number;
  purchasePrice: number;
  expectedRetailPrice: number;
}

export const StockParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  productVariantIds: z.array(z.string().uuid()).optional(),
  supplierIds: z.array(z.string().uuid()).optional(),
  locationIds: z.array(z.string().uuid()).optional(),
  batchIds: z.array(z.string().uuid()).optional(),
  totalPurchasedUnits: z.number().int().positive().optional(),
  remainingUnits: z.number().int().positive().optional(),
  manufacturedStartDate: z.coerce.string().optional(),
  manufacturedEndDate: z.coerce.string().optional(),
  expirationStartDate: z.coerce.string().optional(),
  expirationEndDate: z.coerce.string().optional(),
  referenceNumber: z.string().max(50).optional(),
  receiptNumber: z.string().max(50).optional(),
  stockSourceIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
  transportationFree: z.number().positive().optional(),
  taxFee: z.number().positive().optional(),
  miscellaneousFee: z.number().positive().optional(),
  purchasePrice: z.number().positive().optional(),
  expectedRetailPrice: z.number().positive().optional(),
});

import { z } from 'zod';

export const BaseReportQuerySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const InventoryStatusQuerySchema = BaseReportQuerySchema.extend({
  locationIds: z.array(z.string().uuid()).optional(),
  productVariantIds: z.array(z.string().uuid()).optional(),
});

export const SalesReportQuerySchema = BaseReportQuerySchema.extend({
  customerIds: z.array(z.string().uuid()).optional(),
  productVariantIds: z.array(z.string().uuid()).optional(),
});

export const InventoryValuationQuerySchema = BaseReportQuerySchema.extend({
  locationIds: z.array(z.string().uuid()).optional(),
});

export const StockMovementQuerySchema = BaseReportQuerySchema.extend({
  productVariantIds: z.array(z.string().uuid()).optional(),
  locationIds: z.array(z.string().uuid()).optional(),
});

export const TopCustomersQuerySchema = BaseReportQuerySchema.extend({
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export const SupplierPerformanceQuerySchema = BaseReportQuerySchema.extend({
  supplierIds: z.array(z.string().uuid()).optional(),
});

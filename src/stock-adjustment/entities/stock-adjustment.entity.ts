import { z } from 'zod';

export class StockAdjustment {
  id: string;
  stockId: string;
  adjustReasonId: string;
  quantity: number;
  remark: string;
  isEnabled: boolean;
  enabledById: string;
  disabledById: string;
  disabledDate: Date;
}

export const StockAdjustmentParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  stockIds: z.array(z.string().uuid()).optional(),
  adjustReasonIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

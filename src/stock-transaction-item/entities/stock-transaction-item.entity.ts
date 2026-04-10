import { z } from 'zod';

export class StockTransactionItem {
  stockId: string;
  quantity: number;
  createdAt: Date;
  isEnabled: boolean;
  enableRemark: string;
  enabledById: string;
  disableRemark: string;
  disabledById: string;
  disabledDate: Date;
}

export const StockTransactionItemSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  stockIds: z.array(z.string().uuid()).optional(),
  quantity: z.number().int().optional(),
  isEnabled: z.boolean().optional(),
  enableRemark: z.string().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disableRemark: z.string().optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

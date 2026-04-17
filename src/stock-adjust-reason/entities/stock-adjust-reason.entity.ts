import { z } from 'zod';

export class StockAdjustReason {
  id: string;
  title: string;
  abbreviation: string;
  description: string;
  isEnabled: boolean;
  enabledById: string;
  disabledById: string;
  disabledDate: Date;
}

export const StockAdjustReasonParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  title: z.string().optional(),
  abbreviation: z.string().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

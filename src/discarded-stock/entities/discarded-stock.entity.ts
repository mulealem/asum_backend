import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class DiscardedStock {
  id: string;
  stockId: string;
  discardedReasonId: string;
  quantity: number;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const DiscardedStockParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  stockIds: z.array(z.string().uuid()).optional(),
  discardedReasonIds: z.array(z.string().uuid()).optional(),
  quantity: z.number().int().positive(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

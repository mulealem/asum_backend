import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class Carrier {
  id: string;
  title: string;
  identifier: string;
  description: string;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const CarrierParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  title: z.string().optional(),
  identifier: z.string().optional(),
  carrierTypeIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class Customer {
  name: string;
  phoneNumber: string;
  tin: string;
  address: string;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const CustomerParameterSchema = z.object({
  search: z.string().optional(),
  ids: z.array(z.string().uuid()).optional(),
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  tin: z.string().optional(),
  address: z.string().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

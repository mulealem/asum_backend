import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class Role {
  title: string;
  permissions: string;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const RoleParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  title: z.string().optional(),
  permissions: z.string().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

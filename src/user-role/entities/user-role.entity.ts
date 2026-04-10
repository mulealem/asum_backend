import { Role } from '../../role/entities/role.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class UserRole {
  userId: string;
  user: User;
  roleId: string;
  role: Role;
  isEnabled: boolean;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
  enabledById: string;
  enabledBy: User;
}

export const UserRoleParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  userIds: z.array(z.string().uuid()).optional(),
  roleIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

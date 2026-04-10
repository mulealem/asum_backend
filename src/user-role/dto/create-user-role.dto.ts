import { z } from 'zod';

export class CreateUserRoleDto {
  userId: string;
  roleId: string;
  enabledById: string | null;
}

export const CreateUserRoleSchema = z.object({
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
});

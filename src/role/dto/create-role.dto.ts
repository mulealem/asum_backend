import { z } from 'zod';

export class CreateRoleDto {
  title: string;
  permissions: string;
  enabledById: string | null;
}

export const CreateRoleSchema = z.object({
  title: z.string().min(3).max(50),
  permissions: z.string().optional(),
});

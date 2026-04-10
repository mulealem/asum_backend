import { z } from 'zod';

export class CreateUserDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  enabledById: string | null;
  roleIds: string[];
}

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15),
  password: z.string().min(6).max(50),
  roleIds: z.array(z.string().uuid()).optional(),
});

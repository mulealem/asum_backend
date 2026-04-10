import { z } from 'zod';

export class User {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const UserParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  password: z.string().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

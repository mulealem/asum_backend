import { z } from 'zod';

export class UpdateOrganizationSettingDto {
  name?: string;
  address?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  logoUrl?: string;
  bgColor?: string;
  textColor?: string;
  updatedById?: string;
}

export const UpdateOrganizationSettingSchema = z.object({
  name: z.string().min(1).max(200),
  address: z.string().max(500).optional(),
  phone1: z.string().max(30).optional(),
  phone2: z.string().max(30).optional(),
  email: z.string().email().max(100).optional(),
  logoUrl: z.string().max(500).optional(),
  bgColor: z.string().max(20).optional(),
  textColor: z.string().max(20).optional(),
});

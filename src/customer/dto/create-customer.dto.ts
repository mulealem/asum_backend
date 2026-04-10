import { z } from 'zod';

export class CreateCustomerDto {
  name: string;
  phoneNumber: string;
  tin: string;
  address: string;
  enabledById: string | null;
}

export const CreateCustomerSchema = z.object({
  name: z.string().max(50),
  phoneNumber: z.string().min(10).max(20),
  tin: z.string().min(10).max(20).optional(),
  address: z.string().optional(),
});

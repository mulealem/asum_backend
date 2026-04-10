import { z } from 'zod';

export class CreateCarrierDto {
  title: string;
  identifier: string;
  description: string;
  carrierTypeId: string;
  enabledById: string | null;
}

export const CreateCarrierSchema = z.object({
  title: z.string().min(3).max(50),
  identifier: z.string().max(20),
  description: z.string().max(300).optional(),
  carrierTypeId: z.string().uuid(),
});

import { z } from 'zod';

export class CreateBankAccountDto {
  bankId: string;
  name: string;
  code: string;
  branch: string;
  accountNumber: string;
  accountName: string;
  enabledById: string | null;
}

export const CreateBankAccountSchema = z.object({
  bankId: z.string().uuid(),
  name: z.string().max(100).optional(),
  code: z.string().max(30).optional(),
  branch: z.string().max(100).optional(),
  accountNumber: z.string().max(20),
  accountName: z.string().max(50),
});

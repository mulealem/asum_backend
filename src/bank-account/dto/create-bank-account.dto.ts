import { z } from 'zod';

export class CreateBankAccountDto {
  bankId: string;
  accountNumber: string;
  accountName: string;
  enabledById: string | null;
}

export const CreateBankAccountSchema = z.object({
  bankId: z.string().uuid(),
  accountNumber: z.string().max(20),
  accountName: z.string().max(50),
});

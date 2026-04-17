import { ExpenseCategory } from '@prisma/client';
import { z } from 'zod';

export class CreateExpenseDto {
  category: ExpenseCategory;
  amount: number;
  description?: string;
  referenceNumber?: string;
  bankAccountId: string;
  enabledById: string | null;
}

export const CreateExpenseSchema = z.object({
  category: z.nativeEnum(ExpenseCategory),
  amount: z.number().positive(),
  description: z.string().max(500).optional(),
  referenceNumber: z.string().max(100).optional(),
  bankAccountId: z.string().uuid(),
});

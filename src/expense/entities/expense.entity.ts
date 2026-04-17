import { ExpenseCategory } from '@prisma/client';
import { z } from 'zod';

export class Expense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  description?: string;
  referenceNumber?: string;
  bankAccountId: string;
  isEnabled: boolean;
  enabledById: string;
  disabledById: string;
  disabledDate: Date;
}

export const ExpenseParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  categories: z.array(z.nativeEnum(ExpenseCategory)).optional(),
  bankAccountIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.date().optional(),
  enabledEndDate: z.coerce.date().optional(),
  disabledStartDate: z.coerce.date().optional(),
  disabledEndDate: z.coerce.date().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
});

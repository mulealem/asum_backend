import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class BankAccount {
  id: string;
  bankId: string;
  accountNumber: string;
  accountName: string;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const BankAccountParameterSchema = z.object({
  bankIds: z.array(z.string().uuid()).optional(),
  accountNumber: z.string().max(20).optional(),
  accountName: z.string().max(50).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
});

import { BankAccount } from '../../bank-account/entities/bank-account.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { PaymentOption } from '../../payment-option/entities/payment-option.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class Order {
  customerId: string;
  customer: Customer;
  paymentOptionId: string;
  paymentOption: PaymentOption;
  paymentOptionRefernce: string;
  expectedBankAccountId: string;
  expectedBankAccount: BankAccount;
  remark: string;
  isFullyPaid: boolean;
  isPartiallyPaid: boolean;
  isFullyApproved: boolean;
  isPartiallyApproved: boolean;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
  status: string;
  lastApprovedDate: Date;
  isPartiallyFulfilled: boolean;
  isFullyFulfilled: boolean;
  lastFulfilledDate: Date;
  isPartiallyShipped: boolean;
  isFullyShipped: boolean;
  orderNumber: number;
}

export const OrderParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  customerIds: z.array(z.string().uuid()).optional(),
  paymentOptionIds: z.array(z.string().uuid()).optional(),
  paymentOptionRefernce: z.string().optional(),
  expectedBankAccountIds: z.array(z.string().uuid()).optional(),
  remark: z.string().optional(),
  isFullyPaid: z.boolean().optional(),
  isPartiallyPaid: z.boolean().optional(),
  isFullyApproved: z.boolean().optional(),
  isPartiallyApproved: z.boolean().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
  status: z.string().optional(),
  lastApprovedDate: z.coerce.string().optional(),
  isPartiallyFulfilled: z.boolean().optional(),
  isFullyFulfilled: z.boolean().optional(),
  lastFulfilledDate: z.coerce.string().optional(),
  isPartiallyShipped: z.boolean().optional(),
  isFullyShipped: z.boolean().optional(),
  orderNumber: z.number().optional(),
});

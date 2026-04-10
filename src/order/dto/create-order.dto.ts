// import { Prisma } from '@prisma/client';
import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

export class CreateOrderDto {
  customerId: string;
  paymentOptionId: string;
  expectedBankAccountId: string;
  remark: string;
  isFullyPaid: boolean;
  isPartiallyPaid: boolean;
  isFullyApproved: boolean;
  isPartiallyApproved: boolean;
  status: OrderStatus;
  lastApprovedDate: Date;
  isPartiallyFulfilled: boolean;
  isFullyFulfilled: boolean;
  lastFulfilledDate: Date;
  isPartiallyShipped: boolean;
  isFullyShipped: boolean;
  orderNumber: number;
  paymentOptionRefernce: string;
  enabledById: string | null;
}

export const CreateOrderSchema = z.object({
  customerId: z.string().uuid(),
  paymentOptionId: z.string().uuid(),
  expectedBankAccountId: z.string().uuid().optional(),
  remark: z.string().max(300).optional(),
  isFullyPaid: z.boolean().optional().default(false),
  isPartiallyPaid: z.boolean().optional().default(false),
  isFullyApproved: z.boolean().optional().default(false),
  isPartiallyApproved: z.boolean().optional().default(false),
  status: z
    .string()
    .optional()
    .default(OrderStatus.PENDING_APPROVAL)
    .transform((value) =>
      value
        .trim()
        .toUpperCase()
        .replace(/[\s-]+/g, '_'),
    )
    .pipe(z.nativeEnum(OrderStatus)),
  lastApprovedDate: z.date().optional(),
  isPartiallyFulfilled: z.boolean().optional().default(false),
  isFullyFulfilled: z.boolean().optional().default(false),
  lastFulfilledDate: z.date().optional(),
  isPartiallyShipped: z.boolean().optional(),
  isFullyShipped: z.boolean().optional().default(false),
  orderNumber: z.number().optional(),
});

import { z } from 'zod';

export const CheckoutOrderSchema = z
  .object({
    customerId: z.string().uuid().optional(),
    customer: z
      .object({
        name: z.string().max(50),
        phoneNumber: z.string().min(10).max(20),
        tin: z.string().min(10).max(20).optional(),
        address: z.string().optional(),
      })
      .optional(),
    order: z.object({
      paymentOptionId: z.string().uuid(),
      expectedBankAccountId: z.string().uuid().optional(),
      paymentOptionRefernce: z.string().optional(),
      remark: z.string().max(300).optional(),
      vatAmount: z.number().min(0).optional(),
      withholdingAmount: z.number().min(0).optional(),
    }),
    items: z
      .array(
        z.object({
          productVariantId: z.string().uuid(),
          productVariantPriceId: z.string().uuid().optional(),
          purchasedQuantity: z.number().int().min(1),
          price: z.number().min(0),
          currency: z.string().max(3),
        }),
      )
      .min(1),
  })
  .refine((data) => data.customerId || data.customer, {
    message: 'Either customerId or customer details must be provided',
  });

export type CheckoutOrderDto = z.infer<typeof CheckoutOrderSchema>;

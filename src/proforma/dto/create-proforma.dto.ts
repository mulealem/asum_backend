import { z } from 'zod';

export const CreateProformaSchema = z.object({
  proformaTo: z.string().min(1).max(200),
  date: z.coerce.date().optional(),
  customerId: z.string().uuid().optional(),
  vatRate: z.number().min(0).max(1).default(0),
  withholdingRate: z.number().min(0).max(1).default(0),
  remark: z.string().max(500).optional(),
  items: z
    .array(
      z.object({
        productVariantId: z.string().uuid(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().min(0),
        currency: z.string().max(5).default('ETB'),
        remark: z.string().max(300).optional(),
      }),
    )
    .min(1),
});

export type CreateProformaDto = z.infer<typeof CreateProformaSchema>;

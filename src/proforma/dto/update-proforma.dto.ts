import { z } from 'zod';

export const UpdateProformaSchema = z.object({
  proformaTo: z.string().min(1).max(200).optional(),
  date: z.coerce.date().optional(),
  customerId: z.string().uuid().optional(),
  vatRate: z.number().min(0).max(1).optional(),
  withholdingRate: z.number().min(0).max(1).optional(),
  remark: z.string().max(500).optional(),
});

export type UpdateProformaDto = z.infer<typeof UpdateProformaSchema>;

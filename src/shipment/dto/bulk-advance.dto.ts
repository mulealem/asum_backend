import { z } from 'zod';

export const BulkAdvanceSchema = z.object({
  ids: z
    .array(z.string().uuid())
    .min(1, 'At least one shipment ID is required'),
});

export type BulkAdvanceDto = z.infer<typeof BulkAdvanceSchema>;

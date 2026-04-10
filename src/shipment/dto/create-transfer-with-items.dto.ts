import { z } from 'zod';

export const CreateTransferWithItemsSchema = z.object({
  carrierId: z.string().uuid(),
  fromLocationId: z.string().uuid(),
  toLocationId: z.string().uuid(),
  shipmentNumber: z.string().default('0'),
  shipmentScheduledDate: z.coerce.date(),
  expectedArrivalDate: z.coerce.date(),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        stockId: z.string().uuid(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, 'At least one item is required'),
});

export type CreateTransferWithItemsDto = z.infer<
  typeof CreateTransferWithItemsSchema
>;

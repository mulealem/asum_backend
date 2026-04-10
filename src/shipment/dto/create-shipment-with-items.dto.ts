import { z } from 'zod';

export const CreateShipmentWithItemsSchema = z.object({
  carrierId: z.string().uuid(),
  fromLocationId: z.string().uuid().optional(),
  toLocationId: z.string().uuid().optional(),
  shipmentNumber: z.string().default('0'),
  shipmentScheduledDate: z.coerce.date(),
  expectedArrivalDate: z.coerce.date(),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        orderItemFulfillmentId: z.string().uuid(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, 'At least one item is required'),
});

export type CreateShipmentWithItemsDto = z.infer<
  typeof CreateShipmentWithItemsSchema
>;

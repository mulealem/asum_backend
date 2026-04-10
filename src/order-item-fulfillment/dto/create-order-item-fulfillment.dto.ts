import { z } from 'zod';

export class CreateOrderItemFulfillmentDto {
  orderItemId: string;
  stockId: string;
  fulfilledQuantity: number;
  enabledById: string | null;
}

export const CreateOrderItemFulfillmentSchema = z.object({
  orderItemId: z.string().uuid(),
  stockId: z.string().uuid(),
  fulfilledQuantity: z.number().int(),
});

import { z } from 'zod';

export class CreateShipmentItemStatusDto {
  shipmentItemId: string;
  statusId: string;
  enabledById: string | null;
}

export const CreateShipmentItemStatusSchema = z.object({
  shipmentItemId: z.string().uuid(),
  statusId: z.string().uuid(),
});

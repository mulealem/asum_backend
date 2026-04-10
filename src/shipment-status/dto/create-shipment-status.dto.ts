import { z } from 'zod';

export class CreateShipmentStatusDto {
  shipmentId: string;
  statusId: string;
  enabledById: string | null;
}

export const CreateShipmentStatusSchema = z.object({
  shipmentId: z.string().uuid(),
  statusId: z.string().uuid(),
});

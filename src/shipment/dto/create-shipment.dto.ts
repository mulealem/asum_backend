import { z } from 'zod';

export class CreateShipmentDto {
  carrierId: string;
  fromLocationId?: string;
  toLocationId?: string;
  shipmentNumber: string;
  shipmentScheduledDate: string;
  expectedArrivalDate: string;
  note?: string;
  type?: 'ORDER' | 'TRANSFER';
  enabledById: string | null;
}

export const CreateShipmentSchema = z.object({
  carrierId: z.string().uuid(),
  fromLocationId: z.string().uuid().optional(),
  toLocationId: z.string().uuid().optional(),
  shipmentNumber: z.string().default('0'),
  shipmentScheduledDate: z.coerce.date(),
  expectedArrivalDate: z.coerce.date(),
  note: z.string().optional(),
  type: z.enum(['ORDER', 'TRANSFER']).default('ORDER'),
});

import { z } from 'zod';

export class Shipment {
  id: string;
  createdAt: string;
  type: string;
  carrierId: string;
  fromLocationId: string;
  toLocationId: string;
  isEnabled: boolean;
  enabledById: string;
  disabledById: string;
  disabledDate: string;
  shipmentNumber: number;
  shipmentScheduledDate: string;
  expectedArrivalDate: string;
  actualArrivalDate: string;
  shipmentStartedById: string;
  shipmentStartDate: string;
  arrivalConfirmedById: string;
}

export const ShipmentParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  types: z.array(z.enum(['ORDER', 'TRANSFER'])).optional(),
  carrierIds: z.array(z.string().uuid()).optional(),
  fromLocationIds: z.array(z.string().uuid()).optional(),
  toLocationIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
  shipmentNumber: z.string().optional(),
  shipmentScheduledDateStartDate: z.coerce.string().optional(),
  shipmentScheduledDateEndDate: z.coerce.string().optional(),
  expectedArrivalStartDate: z.coerce.string().optional(),
  expectedArrivalEndDate: z.coerce.string().optional(),
  actualArrivalStartDate: z.coerce.string().optional(),
  actualArrivalEndDate: z.coerce.string().optional(),
  shipmentStartedByIds: z.array(z.string().uuid()).optional(),
  arrivalConfirmedByIds: z.array(z.string().uuid()).optional(),
  shipmentStartDateStartDate: z.coerce.string().optional(),
  shipmentStartDateEndDate: z.coerce.string().optional(),
  statuses: z
    .array(z.enum(['pending', 'loaded', 'started', 'arrived', 'completed']))
    .optional(),
});

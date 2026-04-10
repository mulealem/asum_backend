import { ShipmentStatusOption } from '../../shipment-status-option/entities/shipment-status-option.entity';
import { Shipment } from '../../shipment/entities/shipment.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class ShipmentStatus {
  shipmentId: string;
  Shipment: Shipment;
  statusId: string;
  ShipmentStatusOption: ShipmentStatusOption;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const ShipmentStatusParameterSchema = z.object({
  shipmentIds: z.array(z.string().uuid()).optional(),
  statusIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

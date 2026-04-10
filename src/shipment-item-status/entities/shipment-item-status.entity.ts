import { ShipmentItemStatusOption } from '../../shipment-item-status-option/entities/shipment-item-status-option.entity';
import { ShipmentItem } from '../../shipment-item/entities/shipment-item.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';

export class ShipmentItemStatus {
  shipmentItemId: string;
  ShipmentItem: ShipmentItem;
  statusId: string;
  ShipmentItemStatusOption: ShipmentItemStatusOption;
  isEnabled: boolean;
  enabledById: string;
  enabledBy: User;
  disabledById: string;
  disabledBy: User;
  disabledDate: Date;
}

export const ShipmentItemStatusParameterSchema = z.object({
  shipmentItemIds: z.array(z.string().uuid()).optional(),
  statusIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

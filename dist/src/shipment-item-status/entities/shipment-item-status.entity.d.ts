import { ShipmentItemStatusOption } from '../../shipment-item-status-option/entities/shipment-item-status-option.entity';
import { ShipmentItem } from '../../shipment-item/entities/shipment-item.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class ShipmentItemStatus {
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
export declare const ShipmentItemStatusParameterSchema: z.ZodObject<{
    shipmentItemIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    statusIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    statusIds?: string[];
    shipmentItemIds?: string[];
}, {
    isEnabled?: boolean;
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    statusIds?: string[];
    shipmentItemIds?: string[];
}>;

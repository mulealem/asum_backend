import { ShipmentStatusOption } from '../../shipment-status-option/entities/shipment-status-option.entity';
import { Shipment } from '../../shipment/entities/shipment.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class ShipmentStatus {
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
export declare const ShipmentStatusParameterSchema: z.ZodObject<{
    shipmentIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
    shipmentIds?: string[];
    statusIds?: string[];
}, {
    isEnabled?: boolean;
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    shipmentIds?: string[];
    statusIds?: string[];
}>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentParameterSchema = exports.Shipment = void 0;
const zod_1 = require("zod");
class Shipment {
}
exports.Shipment = Shipment;
exports.ShipmentParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    types: zod_1.z.array(zod_1.z.enum(['ORDER', 'TRANSFER'])).optional(),
    carrierIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    fromLocationIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    toLocationIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
    shipmentNumber: zod_1.z.string().optional(),
    shipmentScheduledDateStartDate: zod_1.z.coerce.string().optional(),
    shipmentScheduledDateEndDate: zod_1.z.coerce.string().optional(),
    expectedArrivalStartDate: zod_1.z.coerce.string().optional(),
    expectedArrivalEndDate: zod_1.z.coerce.string().optional(),
    actualArrivalStartDate: zod_1.z.coerce.string().optional(),
    actualArrivalEndDate: zod_1.z.coerce.string().optional(),
    shipmentStartedByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    arrivalConfirmedByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    shipmentStartDateStartDate: zod_1.z.coerce.string().optional(),
    shipmentStartDateEndDate: zod_1.z.coerce.string().optional(),
    statuses: zod_1.z
        .array(zod_1.z.enum(['pending', 'loaded', 'started', 'arrived', 'completed']))
        .optional(),
});
//# sourceMappingURL=shipment.entity.js.map
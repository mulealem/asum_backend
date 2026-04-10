"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentStatusParameterSchema = exports.ShipmentStatus = void 0;
const zod_1 = require("zod");
class ShipmentStatus {
}
exports.ShipmentStatus = ShipmentStatus;
exports.ShipmentStatusParameterSchema = zod_1.z.object({
    shipmentIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    statusIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=shipment-status.entity.js.map
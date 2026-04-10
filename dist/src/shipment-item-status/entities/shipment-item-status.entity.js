"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentItemStatusParameterSchema = exports.ShipmentItemStatus = void 0;
const zod_1 = require("zod");
class ShipmentItemStatus {
}
exports.ShipmentItemStatus = ShipmentItemStatus;
exports.ShipmentItemStatusParameterSchema = zod_1.z.object({
    shipmentItemIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    statusIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=shipment-item-status.entity.js.map
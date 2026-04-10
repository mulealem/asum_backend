"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentItemParameterSchema = exports.ShipmentItem = void 0;
const zod_1 = require("zod");
class ShipmentItem {
}
exports.ShipmentItem = ShipmentItem;
exports.ShipmentItemParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    shipmentIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    orderItemFulfillmentIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    stockIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=shipment-item.entity.js.map
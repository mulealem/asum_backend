"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShipmentItemSchema = exports.CreateShipmentItemDto = void 0;
const zod_1 = require("zod");
class CreateShipmentItemDto {
}
exports.CreateShipmentItemDto = CreateShipmentItemDto;
exports.CreateShipmentItemSchema = zod_1.z.object({
    shipmentId: zod_1.z.string().uuid(),
    orderItemFulfillmentId: zod_1.z.string().uuid().optional(),
    stockId: zod_1.z.string().uuid().optional(),
    quantity: zod_1.z.number().int().positive(),
});
//# sourceMappingURL=create-shipment-item.dto.js.map
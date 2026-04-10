"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShipmentItemStatusSchema = exports.CreateShipmentItemStatusDto = void 0;
const zod_1 = require("zod");
class CreateShipmentItemStatusDto {
}
exports.CreateShipmentItemStatusDto = CreateShipmentItemStatusDto;
exports.CreateShipmentItemStatusSchema = zod_1.z.object({
    shipmentItemId: zod_1.z.string().uuid(),
    statusId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=create-shipment-item-status.dto.js.map
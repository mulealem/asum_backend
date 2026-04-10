"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShipmentStatusSchema = exports.CreateShipmentStatusDto = void 0;
const zod_1 = require("zod");
class CreateShipmentStatusDto {
}
exports.CreateShipmentStatusDto = CreateShipmentStatusDto;
exports.CreateShipmentStatusSchema = zod_1.z.object({
    shipmentId: zod_1.z.string().uuid(),
    statusId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=create-shipment-status.dto.js.map
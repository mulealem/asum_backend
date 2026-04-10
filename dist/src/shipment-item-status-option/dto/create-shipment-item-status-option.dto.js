"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShipmentItemStatusOptionSchema = exports.CreateShipmentItemStatusOptionDto = void 0;
const zod_1 = require("zod");
class CreateShipmentItemStatusOptionDto {
}
exports.CreateShipmentItemStatusOptionDto = CreateShipmentItemStatusOptionDto;
exports.CreateShipmentItemStatusOptionSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(50),
    abbreviation: zod_1.z.string().max(20),
    description: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=create-shipment-item-status-option.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShipmentStatusOptionSchema = exports.CreateShipmentStatusOptionDto = void 0;
const zod_1 = require("zod");
class CreateShipmentStatusOptionDto {
}
exports.CreateShipmentStatusOptionDto = CreateShipmentStatusOptionDto;
exports.CreateShipmentStatusOptionSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(50),
    abbreviation: zod_1.z.string().max(20),
    description: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=create-shipment-status-option.dto.js.map
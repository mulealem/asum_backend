"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShipmentSchema = exports.CreateShipmentDto = void 0;
const zod_1 = require("zod");
class CreateShipmentDto {
}
exports.CreateShipmentDto = CreateShipmentDto;
exports.CreateShipmentSchema = zod_1.z.object({
    carrierId: zod_1.z.string().uuid(),
    fromLocationId: zod_1.z.string().uuid().optional(),
    toLocationId: zod_1.z.string().uuid().optional(),
    shipmentNumber: zod_1.z.string().default('0'),
    shipmentScheduledDate: zod_1.z.coerce.date(),
    expectedArrivalDate: zod_1.z.coerce.date(),
    note: zod_1.z.string().optional(),
    type: zod_1.z.enum(['ORDER', 'TRANSFER']).default('ORDER'),
});
//# sourceMappingURL=create-shipment.dto.js.map
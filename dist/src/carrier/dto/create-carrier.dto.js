"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarrierSchema = exports.CreateCarrierDto = void 0;
const zod_1 = require("zod");
class CreateCarrierDto {
}
exports.CreateCarrierDto = CreateCarrierDto;
exports.CreateCarrierSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(50),
    identifier: zod_1.z.string().max(20),
    description: zod_1.z.string().max(300).optional(),
    carrierTypeId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=create-carrier.dto.js.map
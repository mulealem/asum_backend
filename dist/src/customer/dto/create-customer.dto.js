"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerSchema = exports.CreateCustomerDto = void 0;
const zod_1 = require("zod");
class CreateCustomerDto {
}
exports.CreateCustomerDto = CreateCustomerDto;
exports.CreateCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().max(50),
    phoneNumber: zod_1.z.string().min(10).max(20),
    tin: zod_1.z.string().min(10).max(20).optional(),
    address: zod_1.z.string().optional(),
});
//# sourceMappingURL=create-customer.dto.js.map
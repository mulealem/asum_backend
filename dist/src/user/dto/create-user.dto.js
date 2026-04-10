"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchema = exports.CreateUserDto = void 0;
const zod_1 = require("zod");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50),
    email: zod_1.z.string().email(),
    phoneNumber: zod_1.z.string().min(10).max(15),
    password: zod_1.z.string().min(6).max(50),
    roleIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
//# sourceMappingURL=create-user.dto.js.map
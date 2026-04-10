"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRoleSchema = exports.CreateUserRoleDto = void 0;
const zod_1 = require("zod");
class CreateUserRoleDto {
}
exports.CreateUserRoleDto = CreateUserRoleDto;
exports.CreateUserRoleSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    roleId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=create-user-role.dto.js.map
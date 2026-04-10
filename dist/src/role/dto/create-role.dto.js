"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoleSchema = exports.CreateRoleDto = void 0;
const zod_1 = require("zod");
class CreateRoleDto {
}
exports.CreateRoleDto = CreateRoleDto;
exports.CreateRoleSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(50),
    permissions: zod_1.z.string().optional(),
});
//# sourceMappingURL=create-role.dto.js.map
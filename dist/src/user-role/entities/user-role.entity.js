"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleParameterSchema = exports.UserRole = void 0;
const zod_1 = require("zod");
class UserRole {
}
exports.UserRole = UserRole;
exports.UserRoleParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    userIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    roleIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=user-role.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleParameterSchema = exports.Role = void 0;
const zod_1 = require("zod");
class Role {
}
exports.Role = Role;
exports.RoleParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    title: zod_1.z.string().optional(),
    permissions: zod_1.z.string().optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=role.entity.js.map
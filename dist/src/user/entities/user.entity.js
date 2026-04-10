"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserParameterSchema = exports.User = void 0;
const zod_1 = require("zod");
class User {
}
exports.User = User;
exports.UserParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=user.entity.js.map
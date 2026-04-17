"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizationSettingSchema = exports.UpdateOrganizationSettingDto = void 0;
const zod_1 = require("zod");
class UpdateOrganizationSettingDto {
}
exports.UpdateOrganizationSettingDto = UpdateOrganizationSettingDto;
exports.UpdateOrganizationSettingSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200),
    address: zod_1.z.string().max(500).optional(),
    phone1: zod_1.z.string().max(30).optional(),
    phone2: zod_1.z.string().max(30).optional(),
    email: zod_1.z.string().email().max(100).optional(),
    logoUrl: zod_1.z.string().max(500).optional(),
    bgColor: zod_1.z.string().max(20).optional(),
    textColor: zod_1.z.string().max(20).optional(),
});
//# sourceMappingURL=update-organization-setting.dto.js.map
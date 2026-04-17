"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProformaParameterSchema = void 0;
const zod_1 = require("zod");
exports.ProformaParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    proformaTo: zod_1.z.string().optional(),
    status: zod_1.z
        .enum(['DRAFT', 'SENT', 'ACCEPTED', 'CONVERTED', 'CANCELLED'])
        .optional(),
    customerId: zod_1.z.string().uuid().optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=proforma.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxParameterSchema = exports.Tax = void 0;
const zod_1 = require("zod");
class Tax {
}
exports.Tax = Tax;
exports.TaxParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    name: zod_1.z.string().optional(),
    abbreviation: zod_1.z.string().optional(),
    type: zod_1.z.enum(['SALES', 'PURCHASE', 'ALL']).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=tax.entity.js.map
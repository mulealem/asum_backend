"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaxSchema = exports.CreateTaxDto = void 0;
const zod_1 = require("zod");
class CreateTaxDto {
}
exports.CreateTaxDto = CreateTaxDto;
exports.CreateTaxSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    abbreviation: zod_1.z.string().max(20).optional(),
    rate: zod_1.z.number().min(0).max(1),
    type: zod_1.z.enum(['SALES', 'PURCHASE', 'ALL']).default('ALL'),
    description: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=create-tax.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBrandSchema = exports.CreateBrandDto = void 0;
const zod_1 = require("zod");
class CreateBrandDto {
}
exports.CreateBrandDto = CreateBrandDto;
exports.CreateBrandSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    abbreviation: zod_1.z.string().min(1).max(20),
    description: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=create-brand.dto.js.map
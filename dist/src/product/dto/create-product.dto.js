"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSchema = exports.CreateProductDto = void 0;
const zod_1 = require("zod");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
exports.CreateProductSchema = zod_1.z.object({
    typeOfProductId: zod_1.z.string().min(3).max(50),
    title: zod_1.z.string().min(3).max(50),
    abbreviation: zod_1.z.string().max(20),
    description: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=create-product.dto.js.map
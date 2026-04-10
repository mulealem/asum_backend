"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductVariantAttributeSchema = exports.CreateProductVariantAttributeDto = void 0;
const zod_1 = require("zod");
class CreateProductVariantAttributeDto {
}
exports.CreateProductVariantAttributeDto = CreateProductVariantAttributeDto;
exports.CreateProductVariantAttributeSchema = zod_1.z.object({
    productVariantId: zod_1.z.string().uuid(),
    key: zod_1.z.string().min(1).max(50),
    value: zod_1.z.string().min(1).max(50),
});
//# sourceMappingURL=create-product-variant-attribute.dto.js.map
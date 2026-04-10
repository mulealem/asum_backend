"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductVariantSchema = exports.CreateProductVariantDto = void 0;
const zod_1 = require("zod");
class CreateProductVariantDto {
}
exports.CreateProductVariantDto = CreateProductVariantDto;
exports.CreateProductVariantSchema = zod_1.z.object({
    productId: zod_1.z.string().uuid(),
    code: zod_1.z.string().max(7),
    brandId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=create-product-variant.dto.js.map
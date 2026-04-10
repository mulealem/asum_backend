"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductVariantPriceSchema = exports.CreateProductVariantPriceDto = void 0;
const zod_1 = require("zod");
class CreateProductVariantPriceDto {
}
exports.CreateProductVariantPriceDto = CreateProductVariantPriceDto;
exports.CreateProductVariantPriceSchema = zod_1.z.object({
    listPrice: zod_1.z.number().positive(),
    currency: zod_1.z.string().max(3),
    tag: zod_1.z.string().max(50).optional(),
    productVariantId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=create-product-variant-price.dto.js.map
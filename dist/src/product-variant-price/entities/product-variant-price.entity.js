"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantPriceParameterSchema = exports.ProductVariantPrice = void 0;
const zod_1 = require("zod");
class ProductVariantPrice {
}
exports.ProductVariantPrice = ProductVariantPrice;
exports.ProductVariantPriceParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    listPrice: zod_1.z.number().int().optional(),
    currency: zod_1.z.string().max(3).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    productVariantIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=product-variant-price.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductParameterSchema = exports.Product = void 0;
const zod_1 = require("zod");
class Product {
}
exports.Product = Product;
exports.ProductParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    typeOfProductIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    title: zod_1.z.string().optional(),
    abbreviation: zod_1.z.string().optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=product.entity.js.map
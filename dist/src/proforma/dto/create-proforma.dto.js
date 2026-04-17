"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProformaSchema = void 0;
const zod_1 = require("zod");
exports.CreateProformaSchema = zod_1.z.object({
    proformaTo: zod_1.z.string().min(1).max(200),
    date: zod_1.z.coerce.date().optional(),
    customerId: zod_1.z.string().uuid().optional(),
    vatRate: zod_1.z.number().min(0).max(1).default(0),
    withholdingRate: zod_1.z.number().min(0).max(1).default(0),
    remark: zod_1.z.string().max(500).optional(),
    items: zod_1.z
        .array(zod_1.z.object({
        productVariantId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().positive(),
        unitPrice: zod_1.z.number().min(0),
        currency: zod_1.z.string().max(5).default('ETB'),
        remark: zod_1.z.string().max(300).optional(),
    }))
        .min(1),
});
//# sourceMappingURL=create-proforma.dto.js.map
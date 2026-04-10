"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseRequestSchema = exports.CreatePurchaseRequestDto = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
class CreatePurchaseRequestDto {
}
exports.CreatePurchaseRequestDto = CreatePurchaseRequestDto;
exports.CreatePurchaseRequestSchema = zod_1.z.object({
    supplierId: zod_1.z.string().uuid(),
    status: zod_1.z
        .string()
        .optional()
        .default(client_1.PurchaseRequestStatus.DRAFT)
        .transform((value) => value
        .trim()
        .toUpperCase()
        .replace(/[\s-]+/g, '_'))
        .pipe(zod_1.z.nativeEnum(client_1.PurchaseRequestStatus)),
    remark: zod_1.z.string().max(500).optional(),
    expectedDeliveryDate: zod_1.z.coerce.date().optional(),
    items: zod_1.z
        .array(zod_1.z.object({
        productVariantId: zod_1.z.string().uuid(),
        requestedQuantity: zod_1.z.number().int().min(1),
        expectedUnitPrice: zod_1.z.number().min(0).optional(),
        currency: zod_1.z.string().max(3).optional(),
        remark: zod_1.z.string().max(300).optional(),
    }))
        .min(1),
});
//# sourceMappingURL=create-purchase-request.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseRequestItemSchema = exports.CreatePurchaseRequestItemDto = void 0;
const zod_1 = require("zod");
class CreatePurchaseRequestItemDto {
}
exports.CreatePurchaseRequestItemDto = CreatePurchaseRequestItemDto;
exports.CreatePurchaseRequestItemSchema = zod_1.z.object({
    purchaseRequestId: zod_1.z.string().uuid(),
    productVariantId: zod_1.z.string().uuid(),
    requestedQuantity: zod_1.z.number().int().min(1),
    expectedUnitPrice: zod_1.z.number().min(0).optional(),
    currency: zod_1.z.string().max(3).optional(),
    remark: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=create-purchase-request-item.dto.js.map
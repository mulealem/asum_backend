"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchaseRequestItemSchema = exports.UpdatePurchaseRequestItemDto = void 0;
const zod_1 = require("zod");
class UpdatePurchaseRequestItemDto {
}
exports.UpdatePurchaseRequestItemDto = UpdatePurchaseRequestItemDto;
exports.UpdatePurchaseRequestItemSchema = zod_1.z.object({
    requestedQuantity: zod_1.z.number().int().min(1).optional(),
    expectedUnitPrice: zod_1.z.number().min(0).optional(),
    currency: zod_1.z.string().max(3).optional(),
    remark: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=update-purchase-request-item.dto.js.map
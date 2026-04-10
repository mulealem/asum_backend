"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchaseRequestSchema = exports.UpdatePurchaseRequestDto = void 0;
const zod_1 = require("zod");
class UpdatePurchaseRequestDto {
}
exports.UpdatePurchaseRequestDto = UpdatePurchaseRequestDto;
exports.UpdatePurchaseRequestSchema = zod_1.z.object({
    supplierId: zod_1.z.string().uuid().optional(),
    remark: zod_1.z.string().max(500).optional(),
    expectedDeliveryDate: zod_1.z.coerce.date().optional(),
});
//# sourceMappingURL=update-purchase-request.dto.js.map
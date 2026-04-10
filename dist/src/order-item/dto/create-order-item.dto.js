"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderItemSchema = exports.CreateOrderItemDto = void 0;
const zod_1 = require("zod");
class CreateOrderItemDto {
}
exports.CreateOrderItemDto = CreateOrderItemDto;
exports.CreateOrderItemSchema = zod_1.z.object({
    purchasedQuantity: zod_1.z.number().int(),
    isApproved: zod_1.z.boolean().optional().default(false),
    approvedById: zod_1.z.string().uuid().optional(),
    productVariantId: zod_1.z.string().uuid(),
    productVariantPriceId: zod_1.z.string().uuid(),
    orderId: zod_1.z.string().uuid(),
    price: zod_1.z.number().int(),
    currency: zod_1.z.string().max(3),
    isPartiallyFulfilled: zod_1.z.boolean().optional().default(false),
    fulfilledQuantity: zod_1.z.number().int().optional().default(0),
    isFullyFulfilled: zod_1.z.boolean().optional().default(false),
});
//# sourceMappingURL=create-order-item.dto.js.map
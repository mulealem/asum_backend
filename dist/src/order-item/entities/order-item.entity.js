"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemParameterSchema = exports.OrderItem = void 0;
const zod_1 = require("zod");
class OrderItem {
}
exports.OrderItem = OrderItem;
exports.OrderItemParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    purchasedQuantity: zod_1.z.number().int().optional(),
    isApproved: zod_1.z.boolean().optional(),
    approvedByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    approvedStartDate: zod_1.z.coerce.string().optional(),
    approvedEndDate: zod_1.z.coerce.string().optional(),
    productVariantIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
    productVariantPriceIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    orderIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    price: zod_1.z.number().int().optional(),
    currency: zod_1.z.string().max(3).optional(),
    isPartiallyFulfilled: zod_1.z.boolean().optional(),
    fulfilledQuantity: zod_1.z.number().int().optional(),
    isFullyFulfilled: zod_1.z.boolean().optional(),
    isPartiallyShipped: zod_1.z.boolean().optional(),
    shippedQuantity: zod_1.z.number().int().optional(),
    isFullyShipped: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=order-item.entity.js.map
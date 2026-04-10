"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemFulfillmentParameterSchema = exports.OrderItemFulfillment = void 0;
const zod_1 = require("zod");
class OrderItemFulfillment {
}
exports.OrderItemFulfillment = OrderItemFulfillment;
exports.OrderItemFulfillmentParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    orderItemIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    stockIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    locationIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    fulfilledQuantity: zod_1.z.number().int().optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=order-item-fulfillment.entity.js.map
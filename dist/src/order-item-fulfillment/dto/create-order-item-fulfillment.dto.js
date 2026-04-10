"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderItemFulfillmentSchema = exports.CreateOrderItemFulfillmentDto = void 0;
const zod_1 = require("zod");
class CreateOrderItemFulfillmentDto {
}
exports.CreateOrderItemFulfillmentDto = CreateOrderItemFulfillmentDto;
exports.CreateOrderItemFulfillmentSchema = zod_1.z.object({
    orderItemId: zod_1.z.string().uuid(),
    stockId: zod_1.z.string().uuid(),
    fulfilledQuantity: zod_1.z.number().int(),
});
//# sourceMappingURL=create-order-item-fulfillment.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderPaymentSchema = exports.CreateOrderPaymentDto = void 0;
const zod_1 = require("zod");
class CreateOrderPaymentDto {
}
exports.CreateOrderPaymentDto = CreateOrderPaymentDto;
exports.CreateOrderPaymentSchema = zod_1.z.object({
    paidAmount: zod_1.z.number().int(),
    orderId: zod_1.z.string().uuid(),
    paymentId: zod_1.z.string().uuid().optional(),
});
//# sourceMappingURL=create-order-payment.dto.js.map
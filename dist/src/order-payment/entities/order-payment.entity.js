"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPaymentParameterSchema = exports.OrderPayment = void 0;
const zod_1 = require("zod");
class OrderPayment {
}
exports.OrderPayment = OrderPayment;
exports.OrderPaymentParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    orderIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    paymentIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
//# sourceMappingURL=order-payment.entity.js.map
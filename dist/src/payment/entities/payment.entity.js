"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentParameterSchema = exports.Payment = void 0;
const zod_1 = require("zod");
class Payment {
}
exports.Payment = Payment;
exports.PaymentParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    amount: zod_1.z.number().int().optional(),
    paymentOptionIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    paymentOptionRefernce: zod_1.z.string().max(50).optional(),
    customerIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
//# sourceMappingURL=payment.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentSchema = exports.CreatePaymentDto = void 0;
const create_order_payment_dto_1 = require("../../order-payment/dto/create-order-payment.dto");
const zod_1 = require("zod");
class CreatePaymentDto {
}
exports.CreatePaymentDto = CreatePaymentDto;
exports.CreatePaymentSchema = zod_1.z.object({
    amount: zod_1.z.number().int(),
    paymentOptionId: zod_1.z.string().uuid(),
    customerId: zod_1.z.string().uuid(),
    referenceNumber: zod_1.z.string().max(50),
    bankAccountId: zod_1.z.string().uuid(),
    orderPayments: zod_1.z.array(create_order_payment_dto_1.CreateOrderPaymentSchema).optional(),
});
//# sourceMappingURL=create-payment.dto.js.map
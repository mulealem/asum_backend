"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderPaymentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_order_payment_dto_1 = require("./create-order-payment.dto");
class UpdateOrderPaymentDto extends (0, mapped_types_1.PartialType)(create_order_payment_dto_1.CreateOrderPaymentDto) {
}
exports.UpdateOrderPaymentDto = UpdateOrderPaymentDto;
//# sourceMappingURL=update-order-payment.dto.js.map
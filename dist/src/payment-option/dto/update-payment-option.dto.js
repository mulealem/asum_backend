"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentOptionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_payment_option_dto_1 = require("./create-payment-option.dto");
class UpdatePaymentOptionDto extends (0, mapped_types_1.PartialType)(create_payment_option_dto_1.CreatePaymentOptionDto) {
}
exports.UpdatePaymentOptionDto = UpdatePaymentOptionDto;
//# sourceMappingURL=update-payment-option.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockTransactionItemSchema = exports.CreateStockTransactionItemDto = void 0;
const zod_1 = require("zod");
class CreateStockTransactionItemDto {
}
exports.CreateStockTransactionItemDto = CreateStockTransactionItemDto;
exports.CreateStockTransactionItemSchema = zod_1.z.object({
    stockId: zod_1.z.string().uuid(),
    quantity: zod_1.z
        .number()
        .int()
        .refine((value) => value !== 0, {
        message: 'Quantity cannot be zero',
    }),
});
//# sourceMappingURL=create-stock-transaction-item.dto.js.map
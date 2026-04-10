"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiscardedStockSchema = exports.CreateDiscardedStockDto = void 0;
const zod_1 = require("zod");
class CreateDiscardedStockDto {
}
exports.CreateDiscardedStockDto = CreateDiscardedStockDto;
exports.CreateDiscardedStockSchema = zod_1.z.object({
    stockId: zod_1.z.string().uuid(),
    discardedReasonId: zod_1.z.string().uuid(),
    quantity: zod_1.z.number().int().positive(),
});
//# sourceMappingURL=create-discarded-stock.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockAdjustmentSchema = exports.CreateStockAdjustmentDto = void 0;
const zod_1 = require("zod");
class CreateStockAdjustmentDto {
}
exports.CreateStockAdjustmentDto = CreateStockAdjustmentDto;
exports.CreateStockAdjustmentSchema = zod_1.z.object({
    stockId: zod_1.z.string().uuid(),
    adjustReasonId: zod_1.z.string().uuid(),
    quantity: zod_1.z.number().int().positive(),
    remark: zod_1.z.string().max(500).optional(),
});
//# sourceMappingURL=create-stock-adjustment.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockAdjustReasonSchema = exports.CreateStockAdjustReasonDto = void 0;
const zod_1 = require("zod");
class CreateStockAdjustReasonDto {
}
exports.CreateStockAdjustReasonDto = CreateStockAdjustReasonDto;
exports.CreateStockAdjustReasonSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(50),
    abbreviation: zod_1.z.string().max(20).optional(),
    description: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=create-stock-adjust-reason.dto.js.map
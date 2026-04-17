"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockAdjustmentParameterSchema = exports.StockAdjustment = void 0;
const zod_1 = require("zod");
class StockAdjustment {
}
exports.StockAdjustment = StockAdjustment;
exports.StockAdjustmentParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    stockIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    adjustReasonIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=stock-adjustment.entity.js.map
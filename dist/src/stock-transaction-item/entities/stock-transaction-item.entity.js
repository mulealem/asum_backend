"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTransactionItemSchema = exports.StockTransactionItem = void 0;
const zod_1 = require("zod");
class StockTransactionItem {
}
exports.StockTransactionItem = StockTransactionItem;
exports.StockTransactionItemSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    stockIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    quantity: zod_1.z.number().int().optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enableRemark: zod_1.z.string().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disableRemark: zod_1.z.string().optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
});
//# sourceMappingURL=stock-transaction-item.entity.js.map
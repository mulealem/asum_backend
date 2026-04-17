"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseParameterSchema = exports.Expense = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
class Expense {
}
exports.Expense = Expense;
exports.ExpenseParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    categories: zod_1.z.array(zod_1.z.nativeEnum(client_1.ExpenseCategory)).optional(),
    bankAccountIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.date().optional(),
    enabledEndDate: zod_1.z.coerce.date().optional(),
    disabledStartDate: zod_1.z.coerce.date().optional(),
    disabledEndDate: zod_1.z.coerce.date().optional(),
    minAmount: zod_1.z.number().optional(),
    maxAmount: zod_1.z.number().optional(),
});
//# sourceMappingURL=expense.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpenseSchema = exports.CreateExpenseDto = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
class CreateExpenseDto {
}
exports.CreateExpenseDto = CreateExpenseDto;
exports.CreateExpenseSchema = zod_1.z.object({
    category: zod_1.z.nativeEnum(client_1.ExpenseCategory),
    amount: zod_1.z.number().positive(),
    description: zod_1.z.string().max(500).optional(),
    referenceNumber: zod_1.z.string().max(100).optional(),
    bankAccountId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=create-expense.dto.js.map
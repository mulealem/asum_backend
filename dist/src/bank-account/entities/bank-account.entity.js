"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountParameterSchema = exports.BankAccount = void 0;
const zod_1 = require("zod");
class BankAccount {
}
exports.BankAccount = BankAccount;
exports.BankAccountParameterSchema = zod_1.z.object({
    bankIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    accountNumber: zod_1.z.string().max(20).optional(),
    accountName: zod_1.z.string().max(50).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
//# sourceMappingURL=bank-account.entity.js.map
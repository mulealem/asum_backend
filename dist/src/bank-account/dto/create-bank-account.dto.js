"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBankAccountSchema = exports.CreateBankAccountDto = void 0;
const zod_1 = require("zod");
class CreateBankAccountDto {
}
exports.CreateBankAccountDto = CreateBankAccountDto;
exports.CreateBankAccountSchema = zod_1.z.object({
    bankId: zod_1.z.string().uuid(),
    name: zod_1.z.string().max(100).optional(),
    code: zod_1.z.string().max(30).optional(),
    branch: zod_1.z.string().max(100).optional(),
    accountNumber: zod_1.z.string().max(20),
    accountName: zod_1.z.string().max(50),
});
//# sourceMappingURL=create-bank-account.dto.js.map
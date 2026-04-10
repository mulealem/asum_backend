"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBankSchema = exports.CreateBankDto = void 0;
const zod_1 = require("zod");
class CreateBankDto {
}
exports.CreateBankDto = CreateBankDto;
exports.CreateBankSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(50),
    abbreviation: zod_1.z.string().max(20),
    description: zod_1.z.string().max(300).optional(),
});
//# sourceMappingURL=create-bank.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockSchema = exports.CreateStockDto = void 0;
const zod_1 = require("zod");
class CreateStockDto {
}
exports.CreateStockDto = CreateStockDto;
exports.CreateStockSchema = zod_1.z.object({
    productVariantId: zod_1.z.string().uuid(),
    supplierId: zod_1.z.string().uuid(),
    locationId: zod_1.z.string().uuid(),
    batchId: zod_1.z.string(),
    totalPurchasedUnits: zod_1.z.number().int().positive(),
    remainingUnits: zod_1.z.number().int().positive(),
    manufacturedDate: zod_1.z
        .string()
        .transform((value) => new Date(value))
        .optional(),
    expirationDate: zod_1.z
        .string()
        .transform((value) => new Date(value))
        .optional(),
    referenceNumber: zod_1.z.string().max(50).optional(),
    receiptNumber: zod_1.z.string().max(50).optional(),
    stockSourceId: zod_1.z.string().uuid(),
    transportationFree: zod_1.z.number().positive(),
    taxFee: zod_1.z.number().positive(),
    miscellaneousFee: zod_1.z.number().positive(),
    purchasePrice: zod_1.z.number().positive(),
    expectedRetailPrice: zod_1.z.number().positive(),
});
//# sourceMappingURL=create-stock.dto.js.map
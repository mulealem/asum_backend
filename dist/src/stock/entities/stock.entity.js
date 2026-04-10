"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockParameterSchema = exports.Stock = void 0;
const zod_1 = require("zod");
class Stock {
}
exports.Stock = Stock;
exports.StockParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    productVariantIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    supplierIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    locationIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    batchIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    totalPurchasedUnits: zod_1.z.number().int().positive().optional(),
    remainingUnits: zod_1.z.number().int().positive().optional(),
    manufacturedStartDate: zod_1.z.coerce.string().optional(),
    manufacturedEndDate: zod_1.z.coerce.string().optional(),
    expirationStartDate: zod_1.z.coerce.string().optional(),
    expirationEndDate: zod_1.z.coerce.string().optional(),
    referenceNumber: zod_1.z.string().max(50).optional(),
    receiptNumber: zod_1.z.string().max(50).optional(),
    stockSourceIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
    transportationFree: zod_1.z.number().positive().optional(),
    taxFee: zod_1.z.number().positive().optional(),
    miscellaneousFee: zod_1.z.number().positive().optional(),
    purchasePrice: zod_1.z.number().positive().optional(),
    expectedRetailPrice: zod_1.z.number().positive().optional(),
});
//# sourceMappingURL=stock.entity.js.map
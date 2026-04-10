"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierPerformanceQuerySchema = exports.TopCustomersQuerySchema = exports.StockMovementQuerySchema = exports.InventoryValuationQuerySchema = exports.SalesReportQuerySchema = exports.InventoryStatusQuerySchema = exports.BaseReportQuerySchema = void 0;
const zod_1 = require("zod");
exports.BaseReportQuerySchema = zod_1.z.object({
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
});
exports.InventoryStatusQuerySchema = exports.BaseReportQuerySchema.extend({
    locationIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    productVariantIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
exports.SalesReportQuerySchema = exports.BaseReportQuerySchema.extend({
    customerIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    productVariantIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
exports.InventoryValuationQuerySchema = exports.BaseReportQuerySchema.extend({
    locationIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
exports.StockMovementQuerySchema = exports.BaseReportQuerySchema.extend({
    productVariantIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    locationIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
exports.TopCustomersQuerySchema = exports.BaseReportQuerySchema.extend({
    limit: zod_1.z.coerce.number().int().min(1).max(100).optional().default(10),
});
exports.SupplierPerformanceQuerySchema = exports.BaseReportQuerySchema.extend({
    supplierIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
//# sourceMappingURL=report-query.dto.js.map
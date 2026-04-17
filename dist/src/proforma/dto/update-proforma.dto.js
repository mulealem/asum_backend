"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProformaSchema = void 0;
const zod_1 = require("zod");
exports.UpdateProformaSchema = zod_1.z.object({
    proformaTo: zod_1.z.string().min(1).max(200).optional(),
    date: zod_1.z.coerce.date().optional(),
    customerId: zod_1.z.string().uuid().optional(),
    vatRate: zod_1.z.number().min(0).max(1).optional(),
    withholdingRate: zod_1.z.number().min(0).max(1).optional(),
    remark: zod_1.z.string().max(500).optional(),
});
//# sourceMappingURL=update-proforma.dto.js.map
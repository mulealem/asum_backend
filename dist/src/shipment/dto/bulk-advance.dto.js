"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkAdvanceSchema = void 0;
const zod_1 = require("zod");
exports.BulkAdvanceSchema = zod_1.z.object({
    ids: zod_1.z
        .array(zod_1.z.string().uuid())
        .min(1, 'At least one shipment ID is required'),
});
//# sourceMappingURL=bulk-advance.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransferWithItemsSchema = void 0;
const zod_1 = require("zod");
exports.CreateTransferWithItemsSchema = zod_1.z.object({
    carrierId: zod_1.z.string().uuid(),
    fromLocationId: zod_1.z.string().uuid(),
    toLocationId: zod_1.z.string().uuid(),
    shipmentNumber: zod_1.z.string().default('0'),
    shipmentScheduledDate: zod_1.z.coerce.date(),
    expectedArrivalDate: zod_1.z.coerce.date(),
    note: zod_1.z.string().optional(),
    items: zod_1.z
        .array(zod_1.z.object({
        stockId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().positive(),
    }))
        .min(1, 'At least one item is required'),
});
//# sourceMappingURL=create-transfer-with-items.dto.js.map
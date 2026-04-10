"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRequestParameterSchema = exports.PurchaseRequest = void 0;
const zod_1 = require("zod");
class PurchaseRequest {
}
exports.PurchaseRequest = PurchaseRequest;
exports.PurchaseRequestParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    supplierIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    status: zod_1.z.string().optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
    purchaseRequestNumber: zod_1.z.number().optional(),
});
//# sourceMappingURL=purchase-request.entity.js.map
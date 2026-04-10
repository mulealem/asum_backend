"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderParameterSchema = exports.Order = void 0;
const zod_1 = require("zod");
class Order {
}
exports.Order = Order;
exports.OrderParameterSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    customerIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    paymentOptionIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    paymentOptionRefernce: zod_1.z.string().optional(),
    expectedBankAccountIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    remark: zod_1.z.string().optional(),
    isFullyPaid: zod_1.z.boolean().optional(),
    isPartiallyPaid: zod_1.z.boolean().optional(),
    isFullyApproved: zod_1.z.boolean().optional(),
    isPartiallyApproved: zod_1.z.boolean().optional(),
    isEnabled: zod_1.z.boolean().optional(),
    enabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    disabledByIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    enabledStartDate: zod_1.z.coerce.string().optional(),
    enabledEndDate: zod_1.z.coerce.string().optional(),
    disabledStartDate: zod_1.z.coerce.string().optional(),
    disabledEndDate: zod_1.z.coerce.string().optional(),
    status: zod_1.z.string().optional(),
    lastApprovedDate: zod_1.z.coerce.string().optional(),
    isPartiallyFulfilled: zod_1.z.boolean().optional(),
    isFullyFulfilled: zod_1.z.boolean().optional(),
    lastFulfilledDate: zod_1.z.coerce.string().optional(),
    isPartiallyShipped: zod_1.z.boolean().optional(),
    isFullyShipped: zod_1.z.boolean().optional(),
    orderNumber: zod_1.z.number().optional(),
});
//# sourceMappingURL=order.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderSchema = exports.CreateOrderDto = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
exports.CreateOrderSchema = zod_1.z.object({
    customerId: zod_1.z.string().uuid(),
    paymentOptionId: zod_1.z.string().uuid(),
    expectedBankAccountId: zod_1.z.string().uuid().optional(),
    remark: zod_1.z.string().max(300).optional(),
    isFullyPaid: zod_1.z.boolean().optional().default(false),
    isPartiallyPaid: zod_1.z.boolean().optional().default(false),
    isFullyApproved: zod_1.z.boolean().optional().default(false),
    isPartiallyApproved: zod_1.z.boolean().optional().default(false),
    status: zod_1.z
        .string()
        .optional()
        .default(client_1.OrderStatus.PENDING_APPROVAL)
        .transform((value) => value
        .trim()
        .toUpperCase()
        .replace(/[\s-]+/g, '_'))
        .pipe(zod_1.z.nativeEnum(client_1.OrderStatus)),
    lastApprovedDate: zod_1.z.date().optional(),
    isPartiallyFulfilled: zod_1.z.boolean().optional().default(false),
    isFullyFulfilled: zod_1.z.boolean().optional().default(false),
    lastFulfilledDate: zod_1.z.date().optional(),
    isPartiallyShipped: zod_1.z.boolean().optional(),
    isFullyShipped: zod_1.z.boolean().optional().default(false),
    orderNumber: zod_1.z.number().optional(),
});
//# sourceMappingURL=create-order.dto.js.map
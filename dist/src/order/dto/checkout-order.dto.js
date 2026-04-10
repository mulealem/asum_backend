"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutOrderSchema = void 0;
const zod_1 = require("zod");
exports.CheckoutOrderSchema = zod_1.z
    .object({
    customerId: zod_1.z.string().uuid().optional(),
    customer: zod_1.z
        .object({
        name: zod_1.z.string().max(50),
        phoneNumber: zod_1.z.string().min(10).max(20),
        tin: zod_1.z.string().min(10).max(20).optional(),
        address: zod_1.z.string().optional(),
    })
        .optional(),
    order: zod_1.z.object({
        paymentOptionId: zod_1.z.string().uuid(),
        expectedBankAccountId: zod_1.z.string().uuid().optional(),
        paymentOptionRefernce: zod_1.z.string().optional(),
        remark: zod_1.z.string().max(300).optional(),
    }),
    items: zod_1.z
        .array(zod_1.z.object({
        productVariantId: zod_1.z.string().uuid(),
        productVariantPriceId: zod_1.z.string().uuid(),
        purchasedQuantity: zod_1.z.number().int().min(1),
        price: zod_1.z.number().int(),
        currency: zod_1.z.string().max(3),
    }))
        .min(1),
})
    .refine((data) => data.customerId || data.customer, {
    message: 'Either customerId or customer details must be provided',
});
//# sourceMappingURL=checkout-order.dto.js.map
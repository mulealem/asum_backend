import { z } from 'zod';
export declare class UpdatePurchaseRequestDto {
    supplierId?: string;
    remark?: string;
    expectedDeliveryDate?: Date;
}
export declare const UpdatePurchaseRequestSchema: z.ZodObject<{
    supplierId: z.ZodOptional<z.ZodString>;
    remark: z.ZodOptional<z.ZodString>;
    expectedDeliveryDate: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    supplierId?: string;
    remark?: string;
    expectedDeliveryDate?: Date;
}, {
    supplierId?: string;
    remark?: string;
    expectedDeliveryDate?: Date;
}>;

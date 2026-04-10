import { User } from '@prisma/client';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Stock } from '../../stock/entities/stock.entity';
import { z } from 'zod';
export declare class OrderItemFulfillment {
    orderItemId: string;
    orderItem: OrderItem;
    stockId: string;
    stock: Stock;
    fulfilledQuantity: number;
    isEnabled: boolean;
    enabledById: string;
    enabledBy: User;
    disabledById: string;
    disabledBy: User;
    disabledDate: Date;
}
export declare const OrderItemFulfillmentParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    orderItemIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    stockIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    locationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    fulfilledQuantity: z.ZodOptional<z.ZodNumber>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    fulfilledQuantity?: number;
    locationIds?: string[];
    orderItemIds?: string[];
    stockIds?: string[];
}, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    fulfilledQuantity?: number;
    locationIds?: string[];
    orderItemIds?: string[];
    stockIds?: string[];
}>;

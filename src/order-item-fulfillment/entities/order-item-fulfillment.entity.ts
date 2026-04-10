import { User } from '@prisma/client';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Stock } from '../../stock/entities/stock.entity';
import { z } from 'zod';

export class OrderItemFulfillment {
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

export const OrderItemFulfillmentParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  orderItemIds: z.array(z.string().uuid()).optional(),
  stockIds: z.array(z.string().uuid()).optional(),
  locationIds: z.array(z.string().uuid()).optional(),
  fulfilledQuantity: z.number().int().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

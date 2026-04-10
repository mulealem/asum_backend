// model ShipmentItem {
//     id                     String               @id @default(uuid())
//     createdAt              DateTime             @default(now())
//     shipment               Shipment             @relation(fields: [shipmentId], references: [id])
//     shipmentId             String
//     orderItemFulfillment   OrderItemFulfillment @relation(fields: [orderItemFulfillmentId], references: [id])
//     orderItemFulfillmentId String
//     quantity               Int
//     isEnabled              Boolean              @default(true)
//     enabledBy              User?                @relation("EnabledBy", fields: [enabledById], references: [id])
//     enabledById            String?
//     disabledBy             User?                @relation("DisabledBy", fields: [disabledById], references: [id])
//     disabledById           String?
//     disabledDate           DateTime?
//     ShipmentItemStatus     ShipmentItemStatus[]
//   }

import { z } from 'zod';

export class ShipmentItem {
  id: string;
  createdAt: string;
  shipmentId: string;
  orderItemFulfillmentId: string;
  stockId: string;
  quantity: number;
  isEnabled: boolean;
  enabledById: string;
  disabledById: string;
  disabledDate: string;
}

export const ShipmentItemParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  shipmentIds: z.array(z.string().uuid()).optional(),
  orderItemFulfillmentIds: z.array(z.string().uuid()).optional(),
  stockIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});

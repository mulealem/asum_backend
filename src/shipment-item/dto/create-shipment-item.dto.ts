// model ShipmentItem {
//     id                     String               @id @default(uuid())
//     createdAt              DateTime             @default(now())
//     shipment               Shipment             @relation(fields: [shipmentId], references: [id])
//     shipmentId             String
//     orderItemFulfillment   OrderItemFulfillment @relation(fields: [orderItemFulfillmentId], references: [id])
//     orderItemFulfillmentId String
//     isEnabled              Boolean              @default(true)
//     enabledBy              User?                @relation("EnabledBy", fields: [enabledById], references: [id])
//     enabledById            String?
//     disabledBy             User?                @relation("DisabledBy", fields: [disabledById], references: [id])
//     disabledById           String?
//     disabledDate           DateTime?
//     ShipmentItemStatus     ShipmentItemStatus[]
//   }

import { z } from 'zod';

export class CreateShipmentItemDto {
  shipmentId: string;
  orderItemFulfillmentId?: string;
  stockId?: string;
  quantity: number;
  enabledById: string | null;
}

export const CreateShipmentItemSchema = z.object({
  shipmentId: z.string().uuid(),
  orderItemFulfillmentId: z.string().uuid().optional(),
  stockId: z.string().uuid().optional(),
  quantity: z.number().int().positive(),
});

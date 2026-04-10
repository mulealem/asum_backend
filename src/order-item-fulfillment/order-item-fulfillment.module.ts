import { Module } from '@nestjs/common';
import { OrderItemFulfillmentService } from './order-item-fulfillment.service';
import { OrderItemFulfillmentController } from './order-item-fulfillment.controller';

@Module({
  controllers: [OrderItemFulfillmentController],
  providers: [OrderItemFulfillmentService],
})
export class OrderItemFulfillmentModule {}

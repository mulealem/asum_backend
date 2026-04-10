import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemFulfillmentDto } from './create-order-item-fulfillment.dto';

export class UpdateOrderItemFulfillmentDto extends PartialType(CreateOrderItemFulfillmentDto) {}

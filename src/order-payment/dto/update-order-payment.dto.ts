import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderPaymentDto } from './create-order-payment.dto';

export class UpdateOrderPaymentDto extends PartialType(CreateOrderPaymentDto) {}

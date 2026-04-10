import { Module } from '@nestjs/common';
import { OrderPaymentService } from './order-payment.service';
import { OrderPaymentController } from './order-payment.controller';

@Module({
  controllers: [OrderPaymentController],
  providers: [OrderPaymentService],
})
export class OrderPaymentModule {}

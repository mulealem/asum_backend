import { Module } from '@nestjs/common';
import { PaymentOptionService } from './payment-option.service';
import { PaymentOptionController } from './payment-option.controller';

@Module({
  controllers: [PaymentOptionController],
  providers: [PaymentOptionService],
})
export class PaymentOptionModule {}

import { Module } from '@nestjs/common';
import { CarrierTypeService } from './carrier-type.service';
import { CarrierTypeController } from './carrier-type.controller';

@Module({
  controllers: [CarrierTypeController],
  providers: [CarrierTypeService],
})
export class CarrierTypeModule {}

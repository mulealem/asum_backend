import { Module } from '@nestjs/common';
import { ShipmentItemStatusOptionService } from './shipment-item-status-option.service';
import { ShipmentItemStatusOptionController } from './shipment-item-status-option.controller';

@Module({
  controllers: [ShipmentItemStatusOptionController],
  providers: [ShipmentItemStatusOptionService],
})
export class ShipmentItemStatusOptionModule {}

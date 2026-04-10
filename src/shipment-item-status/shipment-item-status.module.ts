import { Module } from '@nestjs/common';
import { ShipmentItemStatusService } from './shipment-item-status.service';
import { ShipmentItemStatusController } from './shipment-item-status.controller';

@Module({
  controllers: [ShipmentItemStatusController],
  providers: [ShipmentItemStatusService],
})
export class ShipmentItemStatusModule {}

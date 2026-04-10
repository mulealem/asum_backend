import { Module } from '@nestjs/common';
import { ShipmentStatusService } from './shipment-status.service';
import { ShipmentStatusController } from './shipment-status.controller';

@Module({
  controllers: [ShipmentStatusController],
  providers: [ShipmentStatusService],
})
export class ShipmentStatusModule {}

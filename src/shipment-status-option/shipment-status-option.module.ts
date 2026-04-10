import { Module } from '@nestjs/common';
import { ShipmentStatusOptionService } from './shipment-status-option.service';
import { ShipmentStatusOptionController } from './shipment-status-option.controller';

@Module({
  controllers: [ShipmentStatusOptionController],
  providers: [ShipmentStatusOptionService],
})
export class ShipmentStatusOptionModule {}

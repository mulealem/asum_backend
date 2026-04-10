import { PartialType } from '@nestjs/swagger';
import { CreateShipmentStatusDto } from './create-shipment-status.dto';

export class UpdateShipmentStatusDto extends PartialType(CreateShipmentStatusDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateShipmentStatusOptionDto } from './create-shipment-status-option.dto';

export class UpdateShipmentStatusOptionDto extends PartialType(CreateShipmentStatusOptionDto) {}

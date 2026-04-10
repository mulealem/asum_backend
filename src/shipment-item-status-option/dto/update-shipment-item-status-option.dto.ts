import { PartialType } from '@nestjs/swagger';
import { CreateShipmentItemStatusOptionDto } from './create-shipment-item-status-option.dto';

export class UpdateShipmentItemStatusOptionDto extends PartialType(CreateShipmentItemStatusOptionDto) {}

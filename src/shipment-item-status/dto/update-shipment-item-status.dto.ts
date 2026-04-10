import { PartialType } from '@nestjs/swagger';
import { CreateShipmentItemStatusDto } from './create-shipment-item-status.dto';

export class UpdateShipmentItemStatusDto extends PartialType(CreateShipmentItemStatusDto) {}

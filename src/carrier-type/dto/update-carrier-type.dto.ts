import { PartialType } from '@nestjs/swagger';
import { CreateCarrierTypeDto } from './create-carrier-type.dto';

export class UpdateCarrierTypeDto extends PartialType(CreateCarrierTypeDto) {}

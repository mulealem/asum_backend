import { PartialType } from '@nestjs/swagger';
import { CreateStockDiscardReasonDto } from './create-stock-discard-reason.dto';

export class UpdateStockDiscardReasonDto extends PartialType(CreateStockDiscardReasonDto) {}

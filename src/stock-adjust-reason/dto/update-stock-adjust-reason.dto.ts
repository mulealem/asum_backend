import { PartialType } from '@nestjs/swagger';
import { CreateStockAdjustReasonDto } from './create-stock-adjust-reason.dto';

export class UpdateStockAdjustReasonDto extends PartialType(
  CreateStockAdjustReasonDto,
) {}

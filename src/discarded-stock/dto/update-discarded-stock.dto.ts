import { PartialType } from '@nestjs/swagger';
import { CreateDiscardedStockDto } from './create-discarded-stock.dto';

export class UpdateDiscardedStockDto extends PartialType(CreateDiscardedStockDto) {}

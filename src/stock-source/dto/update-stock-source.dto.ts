import { PartialType } from '@nestjs/mapped-types';
import { CreateStockSourceDto } from './create-stock-source.dto';

export class UpdateStockSourceDto extends PartialType(CreateStockSourceDto) {}

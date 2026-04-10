import { PartialType } from '@nestjs/swagger';
import { CreateStockTransactionItemDto } from './create-stock-transaction-item.dto';

export class UpdateStockTransactionItemDto extends PartialType(CreateStockTransactionItemDto) {}

import { Module } from '@nestjs/common';
import { StockTransactionItemService } from './stock-transaction-item.service';
import { StockTransactionItemController } from './stock-transaction-item.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockTransactionItemController],
  providers: [StockTransactionItemService],
})
export class StockTransactionItemModule {}

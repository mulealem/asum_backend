import { Module } from '@nestjs/common';
import { DiscardedStockService } from './discarded-stock.service';
import { DiscardedStockController } from './discarded-stock.controller';

@Module({
  controllers: [DiscardedStockController],
  providers: [DiscardedStockService],
})
export class DiscardedStockModule {}

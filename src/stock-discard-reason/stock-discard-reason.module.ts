import { Module } from '@nestjs/common';
import { StockDiscardReasonService } from './stock-discard-reason.service';
import { StockDiscardReasonController } from './stock-discard-reason.controller';

@Module({
  controllers: [StockDiscardReasonController],
  providers: [StockDiscardReasonService],
})
export class StockDiscardReasonModule {}

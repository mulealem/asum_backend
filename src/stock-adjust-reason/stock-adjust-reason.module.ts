import { Module } from '@nestjs/common';
import { StockAdjustReasonService } from './stock-adjust-reason.service';
import { StockAdjustReasonController } from './stock-adjust-reason.controller';

@Module({
  controllers: [StockAdjustReasonController],
  providers: [StockAdjustReasonService],
})
export class StockAdjustReasonModule {}

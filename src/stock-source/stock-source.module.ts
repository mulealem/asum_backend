import { Module } from '@nestjs/common';
import { StockSourceService } from './stock-source.service';
import { StockSourceController } from './stock-source.controller';

@Module({
  controllers: [StockSourceController],
  providers: [StockSourceService],
})
export class StockSourceModule {}

import { Module } from '@nestjs/common';
import { PurchaseRequestItemService } from './purchase-request-item.service';
import { PurchaseRequestItemController } from './purchase-request-item.controller';

@Module({
  controllers: [PurchaseRequestItemController],
  providers: [PurchaseRequestItemService],
})
export class PurchaseRequestItemModule {}

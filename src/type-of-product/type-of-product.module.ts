import { Module } from '@nestjs/common';
import { TypeOfProductService } from './type-of-product.service';
import { TypeOfProductController } from './type-of-product.controller';

@Module({
  controllers: [TypeOfProductController],
  providers: [TypeOfProductService],
})
export class TypeOfProductModule {}

import { Module } from '@nestjs/common';
import { ProductVariantPriceService } from './product-variant-price.service';
import { ProductVariantPriceController } from './product-variant-price.controller';

@Module({
  controllers: [ProductVariantPriceController],
  providers: [ProductVariantPriceService],
})
export class ProductVariantPriceModule {}

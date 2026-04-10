import { Module } from '@nestjs/common';
import { ProductVariantAttributeService } from './product-variant-attribute.service';
import { ProductVariantAttributeController } from './product-variant-attribute.controller';

@Module({
  controllers: [ProductVariantAttributeController],
  providers: [ProductVariantAttributeService],
})
export class ProductVariantAttributeModule {}

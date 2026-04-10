import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantPriceDto } from './create-product-variant-price.dto';

export class UpdateProductVariantPriceDto extends PartialType(CreateProductVariantPriceDto) {}

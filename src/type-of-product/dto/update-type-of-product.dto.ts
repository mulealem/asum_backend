import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeOfProductDto } from './create-type-of-product.dto';

export class UpdateTypeOfProductDto extends PartialType(CreateTypeOfProductDto) {}

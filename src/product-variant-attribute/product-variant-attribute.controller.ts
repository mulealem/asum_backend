import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import { ProductVariantAttributeService } from './product-variant-attribute.service';
import {
  CreateProductVariantAttributeDto,
  CreateProductVariantAttributeSchema,
} from './dto/create-product-variant-attribute.dto';
import { UpdateProductVariantAttributeDto } from './dto/update-product-variant-attribute.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ProductVariantAttributeParameterSchema } from './entities/product-variant-attribute.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product-variant-attribute')
@UseGuards(JwtAuthGuard)
export class ProductVariantAttributeController {
  constructor(
    private readonly productVariantAttributeService: ProductVariantAttributeService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductVariantAttributeSchema))
  create(
    @Body() createProductVariantAttributeDto: CreateProductVariantAttributeDto,
  ) {
    return this.productVariantAttributeService.create(
      createProductVariantAttributeDto,
    );
  }

  @Get()
  findAll() {
    return this.productVariantAttributeService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ProductVariantAttributeParameterSchema))
  search(@Body() query) {
    return this.productVariantAttributeService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantAttributeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductVariantAttributeDto: UpdateProductVariantAttributeDto,
  ) {
    return this.productVariantAttributeService.update(
      id,
      updateProductVariantAttributeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantAttributeService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.productVariantAttributeService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.productVariantAttributeService.disable(id, req.user.userId);
  }
}

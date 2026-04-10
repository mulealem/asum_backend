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
import { ProductVariantPriceService } from './product-variant-price.service';
import {
  CreateProductVariantPriceDto,
  CreateProductVariantPriceSchema,
} from './dto/create-product-variant-price.dto';
import { UpdateProductVariantPriceDto } from './dto/update-product-variant-price.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ProductVariantPriceParameterSchema } from './entities/product-variant-price.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product-variant-price')
@UseGuards(JwtAuthGuard)
export class ProductVariantPriceController {
  constructor(
    private readonly productVariantPriceService: ProductVariantPriceService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductVariantPriceSchema))
  create(
    @Body() createProductVariantPriceDto: CreateProductVariantPriceDto,
    @Req() req,
  ) {
    createProductVariantPriceDto.enabledById = req.user.userId;
    return this.productVariantPriceService.create(createProductVariantPriceDto);
  }

  @Get()
  findAll() {
    return this.productVariantPriceService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ProductVariantPriceParameterSchema))
  search(@Body() query) {
    return this.productVariantPriceService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantPriceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductVariantPriceDto: UpdateProductVariantPriceDto,
  ) {
    return this.productVariantPriceService.update(
      id,
      updateProductVariantPriceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantPriceService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.productVariantPriceService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.productVariantPriceService.disable(id, req.user.userId);
  }
}

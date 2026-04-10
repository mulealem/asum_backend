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
import { ProductVariantService } from './product-variant.service';
import {
  CreateProductVariantDto,
  CreateProductVariantSchema,
} from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ProductVariantParameterSchema } from './entities/product-variant.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product-variant')
@UseGuards(JwtAuthGuard)
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductVariantSchema))
  create(@Body() createProductVariantDto: CreateProductVariantDto, @Req() req) {
    createProductVariantDto.enabledById = req.user.userId;
    return this.productVariantService.create(createProductVariantDto);
  }

  @Get()
  findAll() {
    return this.productVariantService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ProductVariantParameterSchema))
  search(@Body() query) {
    return this.productVariantService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return this.productVariantService.update(id, updateProductVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.productVariantService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.productVariantService.disable(id, req.user.userId);
  }
}

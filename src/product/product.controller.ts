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
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateProductSchema,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ProductParameterSchema } from './entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  create(@Body() createProductDto: CreateProductDto, @Req() req) {
    createProductDto.enabledById = req.user.userId;
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ProductParameterSchema))
  search(@Body() query) {
    return this.productService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.productService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.productService.disable(id, req.user.userId);
  }
}

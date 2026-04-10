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
import { TypeOfProductService } from './type-of-product.service';
import {
  CreateTypeOfProductDto,
  CreateTypeOfProductSchema,
} from './dto/create-type-of-product.dto';
import { UpdateTypeOfProductDto } from './dto/update-type-of-product.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { TypeOfProductParameterSchema } from './entities/type-of-product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('type-of-product')
@UseGuards(JwtAuthGuard)
export class TypeOfProductController {
  constructor(private readonly typeOfProductService: TypeOfProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateTypeOfProductSchema))
  create(@Body() createTypeOfProductDto: CreateTypeOfProductDto, @Req() req) {
    createTypeOfProductDto.enabledById = req.user.userId;
    return this.typeOfProductService.create(createTypeOfProductDto);
  }

  @Get()
  findAll() {
    return this.typeOfProductService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(TypeOfProductParameterSchema))
  search(@Body() query) {
    return this.typeOfProductService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeOfProductService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeOfProductDto: UpdateTypeOfProductDto,
  ) {
    return this.typeOfProductService.update(id, updateTypeOfProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeOfProductService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.typeOfProductService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.typeOfProductService.disable(id, req.user.userId);
  }
}

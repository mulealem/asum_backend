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
import { BrandService } from './brand.service';
import { CreateBrandDto, CreateBrandSchema } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { BrandParameterSchema } from './entities/brand.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('brand')
@UseGuards(JwtAuthGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBrandSchema))
  create(@Body() createBrandDto: CreateBrandDto, @Req() req) {
    createBrandDto.enabledById = req.user.userId;
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(BrandParameterSchema))
  search(@Body() query) {
    return this.brandService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.brandService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.brandService.disable(id, req.user.userId);
  }
}

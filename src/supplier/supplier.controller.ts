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
import { SupplierService } from './supplier.service';
import {
  CreateSupplierDto,
  CreateSupplierSchema,
} from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { SupplierParameterSchema } from './entities/supplier.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('supplier')
@UseGuards(JwtAuthGuard)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateSupplierSchema))
  create(@Body() createSupplierDto: CreateSupplierDto, @Req() req) {
    createSupplierDto.enabledById = req.user.userId;
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(SupplierParameterSchema))
  search(@Body() query) {
    return this.supplierService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.supplierService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.supplierService.disable(id, req.user.userId);
  }
}

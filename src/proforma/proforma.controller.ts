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
import { ProformaService } from './proforma.service';
import { CreateProformaSchema } from './dto/create-proforma.dto';
import { UpdateProformaSchema } from './dto/update-proforma.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ProformaParameterSchema } from './entities/proforma.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('proforma')
@UseGuards(JwtAuthGuard)
export class ProformaController {
  constructor(private readonly proformaService: ProformaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProformaSchema))
  create(@Body() dto, @Req() req) {
    return this.proformaService.create(dto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.proformaService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ProformaParameterSchema))
  search(@Body() query) {
    return this.proformaService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proformaService.findOne(id);
  }

  @Get(':id/convert-data')
  getConvertData(@Param('id') id: string) {
    return this.proformaService.getConvertData(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdateProformaSchema))
  update(@Param('id') id: string, @Body() dto) {
    return this.proformaService.update(id, dto);
  }

  @Patch(':id/send')
  send(@Param('id') id: string) {
    return this.proformaService.send(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.proformaService.cancel(id);
  }

  @Patch(':id/mark-converted')
  markConverted(@Param('id') id: string, @Body('orderId') orderId: string) {
    return this.proformaService.markConverted(id, orderId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proformaService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.proformaService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.proformaService.disable(id, req.user.userId);
  }
}

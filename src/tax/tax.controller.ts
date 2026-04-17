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
import { TaxService } from './tax.service';
import { CreateTaxDto, CreateTaxSchema } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { TaxParameterSchema } from './entities/tax.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tax')
@UseGuards(JwtAuthGuard)
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateTaxSchema))
  create(@Body() createTaxDto: CreateTaxDto, @Req() req) {
    createTaxDto.enabledById = req.user.userId;
    return this.taxService.create(createTaxDto);
  }

  @Get()
  findAll() {
    return this.taxService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(TaxParameterSchema))
  search(@Body() query) {
    return this.taxService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxService.update(id, updateTaxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.taxService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.taxService.disable(id, req.user.userId);
  }
}

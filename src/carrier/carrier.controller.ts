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
import { CarrierService } from './carrier.service';
import {
  CreateCarrierDto,
  CreateCarrierSchema,
} from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { CarrierParameterSchema } from './entities/carrier.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('carrier')
@UseGuards(JwtAuthGuard)
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCarrierSchema))
  create(@Body() createCarrierDto: CreateCarrierDto, @Req() req) {
    createCarrierDto.enabledById = req.user.userId;
    return this.carrierService.create(createCarrierDto);
  }

  @Get()
  findAll() {
    return this.carrierService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(CarrierParameterSchema))
  search(@Body() query) {
    return this.carrierService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrierService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrierDto: UpdateCarrierDto) {
    return this.carrierService.update(id, updateCarrierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrierService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.carrierService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.carrierService.disable(id, req.user.userId);
  }
}

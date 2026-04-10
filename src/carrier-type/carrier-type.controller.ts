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
import { CarrierTypeService } from './carrier-type.service';
import {
  CreateCarrierTypeDto,
  CreateCarrierTypeSchema,
} from './dto/create-carrier-type.dto';
import { UpdateCarrierTypeDto } from './dto/update-carrier-type.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { CarrierTypeParameterSchema } from './entities/carrier-type.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('carrier-type')
@UseGuards(JwtAuthGuard)
export class CarrierTypeController {
  constructor(private readonly carrierTypeService: CarrierTypeService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCarrierTypeSchema))
  create(@Body() createCarrierTypeDto: CreateCarrierTypeDto, @Req() req) {
    createCarrierTypeDto.enabledById = req.user.userId;
    return this.carrierTypeService.create(createCarrierTypeDto);
  }

  @Get()
  findAll() {
    return this.carrierTypeService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(CarrierTypeParameterSchema))
  search(@Body() query) {
    return this.carrierTypeService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrierTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarrierTypeDto: UpdateCarrierTypeDto,
  ) {
    return this.carrierTypeService.update(id, updateCarrierTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrierTypeService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.carrierTypeService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.carrierTypeService.disable(id, req.user.userId);
  }
}

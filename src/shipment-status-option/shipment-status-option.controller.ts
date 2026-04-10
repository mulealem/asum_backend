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
import { ShipmentStatusOptionService } from './shipment-status-option.service';
import {
  CreateShipmentStatusOptionDto,
  CreateShipmentStatusOptionSchema,
} from './dto/create-shipment-status-option.dto';
import { UpdateShipmentStatusOptionDto } from './dto/update-shipment-status-option.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ShipmentStatusOptionParameterSchema } from './entities/shipment-status-option.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shipment-status-option')
@UseGuards(JwtAuthGuard)
export class ShipmentStatusOptionController {
  constructor(
    private readonly shipmentStatusOptionService: ShipmentStatusOptionService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateShipmentStatusOptionSchema))
  create(
    @Body()
    createShipmentStatusOptionDto: CreateShipmentStatusOptionDto,
    @Req() req,
  ) {
    createShipmentStatusOptionDto.enabledById = req.user.userId;
    return this.shipmentStatusOptionService.create(
      createShipmentStatusOptionDto,
    );
  }

  @Get()
  findAll() {
    return this.shipmentStatusOptionService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ShipmentStatusOptionParameterSchema))
  search(@Body() query) {
    return this.shipmentStatusOptionService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentStatusOptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateShipmentStatusOptionDto: UpdateShipmentStatusOptionDto,
  ) {
    return this.shipmentStatusOptionService.update(
      id,
      updateShipmentStatusOptionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentStatusOptionService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.shipmentStatusOptionService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.shipmentStatusOptionService.disable(id, req.user.userId);
  }
}

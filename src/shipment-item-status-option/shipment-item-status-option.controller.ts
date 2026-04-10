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
import { ShipmentItemStatusOptionService } from './shipment-item-status-option.service';
import {
  CreateShipmentItemStatusOptionDto,
  CreateShipmentItemStatusOptionSchema,
} from './dto/create-shipment-item-status-option.dto';
import { UpdateShipmentItemStatusOptionDto } from './dto/update-shipment-item-status-option.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ShipmentItemStatusOptionParameterSchema } from './entities/shipment-item-status-option.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shipment-item-status-option')
@UseGuards(JwtAuthGuard)
export class ShipmentItemStatusOptionController {
  constructor(
    private readonly shipmentItemStatusOptionService: ShipmentItemStatusOptionService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateShipmentItemStatusOptionSchema))
  create(
    @Body()
    createShipmentItemStatusOptionDto: CreateShipmentItemStatusOptionDto,
    @Req() req,
  ) {
    createShipmentItemStatusOptionDto.enabledById = req.user.userId;
    return this.shipmentItemStatusOptionService.create(
      createShipmentItemStatusOptionDto,
    );
  }

  @Get()
  findAll() {
    return this.shipmentItemStatusOptionService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ShipmentItemStatusOptionParameterSchema))
  search(@Body() query) {
    return this.shipmentItemStatusOptionService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentItemStatusOptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateShipmentItemStatusOptionDto: UpdateShipmentItemStatusOptionDto,
  ) {
    return this.shipmentItemStatusOptionService.update(
      id,
      updateShipmentItemStatusOptionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentItemStatusOptionService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.shipmentItemStatusOptionService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.shipmentItemStatusOptionService.disable(id, req.user.userId);
  }
}

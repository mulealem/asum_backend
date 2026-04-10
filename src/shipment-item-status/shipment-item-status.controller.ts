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
import { ShipmentItemStatusService } from './shipment-item-status.service';
import {
  CreateShipmentItemStatusDto,
  CreateShipmentItemStatusSchema,
} from './dto/create-shipment-item-status.dto';
import { UpdateShipmentItemStatusDto } from './dto/update-shipment-item-status.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ShipmentItemStatusParameterSchema } from './entities/shipment-item-status.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shipment-item-status')
@UseGuards(JwtAuthGuard)
export class ShipmentItemStatusController {
  constructor(
    private readonly shipmentItemStatusService: ShipmentItemStatusService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateShipmentItemStatusSchema))
  create(
    @Body()
    createShipmentItemStatusDto: CreateShipmentItemStatusDto,
  ) {
    return this.shipmentItemStatusService.create(createShipmentItemStatusDto);
  }

  @Get()
  findAll() {
    return this.shipmentItemStatusService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ShipmentItemStatusParameterSchema))
  search(@Body() query) {
    return this.shipmentItemStatusService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentItemStatusService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateShipmentItemStatusDto: UpdateShipmentItemStatusDto,
  ) {
    return this.shipmentItemStatusService.update(
      id,
      updateShipmentItemStatusDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentItemStatusService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.shipmentItemStatusService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.shipmentItemStatusService.disable(id, req.user.userId);
  }
}

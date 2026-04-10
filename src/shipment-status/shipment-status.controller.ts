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
import { ShipmentStatusService } from './shipment-status.service';
import {
  CreateShipmentStatusDto,
  CreateShipmentStatusSchema,
} from './dto/create-shipment-status.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ShipmentStatusParameterSchema } from './entities/shipment-status.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shipment-status')
@UseGuards(JwtAuthGuard)
export class ShipmentStatusController {
  constructor(private readonly shipmentStatusService: ShipmentStatusService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateShipmentStatusSchema))
  create(
    @Body()
    createShipmentStatusDto: CreateShipmentStatusDto,
    @Req() req,
  ) {
    createShipmentStatusDto.enabledById = req.user.userId;
    return this.shipmentStatusService.create(createShipmentStatusDto);
  }

  @Get()
  findAll() {
    return this.shipmentStatusService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ShipmentStatusParameterSchema))
  search(@Body() query) {
    return this.shipmentStatusService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentStatusService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateShipmentStatusDto: UpdateShipmentStatusDto,
  ) {
    return this.shipmentStatusService.update(id, updateShipmentStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentStatusService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.shipmentStatusService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.shipmentStatusService.disable(id, req.user.userId);
  }
}

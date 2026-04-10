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
import { ShipmentService } from './shipment.service';
import {
  CreateShipmentDto,
  CreateShipmentSchema,
} from './dto/create-shipment.dto';
import { CreateShipmentWithItemsSchema } from './dto/create-shipment-with-items.dto';
import { CreateTransferWithItemsSchema } from './dto/create-transfer-with-items.dto';
import { BulkAdvanceSchema } from './dto/bulk-advance.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ShipmentParameterSchema } from './entities/shipment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('shipment')
@UseGuards(JwtAuthGuard)
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateShipmentSchema))
  @Permissions('canAddOrderShipment')
  create(@Body() createShipmentDto: CreateShipmentDto, @Req() req) {
    createShipmentDto.enabledById = req.user.userId;
    return this.shipmentService.create(createShipmentDto);
  }

  @Post('/create-with-items')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateShipmentWithItemsSchema))
  @Permissions('canAddOrderShipment')
  createWithItems(@Body() body: any, @Req() req) {
    return this.shipmentService.createWithItems(body, req.user.userId);
  }

  @Post('/create-transfer-with-items')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateTransferWithItemsSchema))
  @Permissions('canAddOrderShipment')
  createTransferWithItems(@Body() body: any, @Req() req) {
    return this.shipmentService.createTransferWithItems(body, req.user.userId);
  }

  @Patch('/bulk-advance')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(BulkAdvanceSchema))
  @Permissions('canScheduleOrderShipment')
  bulkAdvance(@Body() body: any, @Req() req) {
    return this.shipmentService.bulkAdvance(body.ids, req.user.userId);
  }

  @Get()
  @Permissions('canViewShipment')
  findAll() {
    return this.shipmentService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ShipmentParameterSchema))
  @Permissions('canViewShipment')
  search(@Body() query) {
    return this.shipmentService.filter(query);
  }

  @Get(':id')
  @Permissions('canViewOrderShipment')
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    return this.shipmentService.update(id, updateShipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.shipmentService.enable(id);
  }

  // loaded, started, arrived, completed
  @Patch(':id/load')
  @Permissions('canScheduleOrderShipment')
  load(@Param('id') id: string, @Req() req) {
    return this.shipmentService.load(id, req.user.userId);
  }

  @Patch(':id/start')
  @Permissions('canStartOrderShipment')
  start(@Param('id') id: string, @Req() req) {
    return this.shipmentService.start(id, req.user.userId);
  }

  @Patch(':id/mark-as-arrived')
  @Permissions('canReceiveOrderShipment')
  arrive(@Param('id') id: string, @Req() req) {
    return this.shipmentService.markAsArrived(id, req.user.userId);
  }

  @Patch(':id/mark-as-completed')
  @Permissions('canCompleteShipment')
  complete(@Param('id') id: string, @Req() req) {
    return this.shipmentService.markAsCompleted(id, req.user.userId);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.shipmentService.disable(id, req.user.userId);
  }
}

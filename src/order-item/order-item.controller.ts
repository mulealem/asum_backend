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
import { OrderItemService } from './order-item.service';
import {
  CreateOrderItemDto,
  CreateOrderItemSchema,
} from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { OrderItemParameterSchema } from './entities/order-item.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('order-item')
@UseGuards(JwtAuthGuard)
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateOrderItemSchema))
  create(@Body() createOrderItemDto: CreateOrderItemDto, @Req() req) {
    createOrderItemDto.enabledById = req.user.userId;
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @Permissions('canViewOrderDetail')
  findAll() {
    return this.orderItemService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(OrderItemParameterSchema))
  @Permissions('canViewOrderDetail')
  search(@Body() query) {
    return this.orderItemService.filter(query);
  }

  @Get(':id')
  @Permissions('canViewOrderDetail')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Post('/fulfill')
  @HttpCode(200)
  @Permissions('canFulfillOrder')
  async fulfill(@Body() fulfillData, @Req() req) {
    fulfillData.enabledById = req.user.userId;
    return await this.orderItemService.fulfill(fulfillData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.orderItemService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.orderItemService.disable(id, req.user.userId);
  }
}

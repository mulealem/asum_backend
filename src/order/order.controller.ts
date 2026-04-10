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
import { OrderService } from './order.service';
import { CreateOrderDto, CreateOrderSchema } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  CheckoutOrderDto,
  CheckoutOrderSchema,
} from './dto/checkout-order.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { OrderParameterSchema } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  @UsePipes(new ZodValidationPipe(CheckoutOrderSchema))
  checkout(@Body() dto: CheckoutOrderDto, @Req() req) {
    return this.orderService.checkout(dto, req.user.userId);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateOrderSchema))
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    createOrderDto.enabledById = req.user.userId;
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @Permissions('canViewOrders')
  findAll() {
    return this.orderService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(OrderParameterSchema))
  @Permissions('canViewOrders')
  search(@Body() query) {
    return this.orderService.filter(query);
  }

  @Get('/pending-payment')
  @HttpCode(200)
  @Permissions('canViewOrderPayment')
  pendingPayment() {
    return this.orderService.pendingPayments();
  }

  @Get('/completed-payment')
  @HttpCode(200)
  @Permissions('canViewOrderPayment')
  completedPayment() {
    return this.orderService.completedPayments();
  }

  @Get(':id')
  @Permissions('canViewOrderDetail')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Patch(':id/approve')
  @Permissions('canApproveOrder')
  approve(@Param('id') id: string) {
    return this.orderService.approve(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.orderService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.orderService.disable(id, req.user.userId);
  }
}

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
import { OrderItemFulfillmentService } from './order-item-fulfillment.service';
import {
  CreateOrderItemFulfillmentDto,
  CreateOrderItemFulfillmentSchema,
} from './dto/create-order-item-fulfillment.dto';
import { UpdateOrderItemFulfillmentDto } from './dto/update-order-item-fulfillment.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { OrderItemFulfillmentParameterSchema } from './entities/order-item-fulfillment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order-item-fulfillment')
@UseGuards(JwtAuthGuard)
export class OrderItemFulfillmentController {
  constructor(
    private readonly orderItemFulfillmentService: OrderItemFulfillmentService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateOrderItemFulfillmentSchema))
  create(
    @Body() createOrderItemFulfillmentDto: CreateOrderItemFulfillmentDto,
    @Req() req,
  ) {
    createOrderItemFulfillmentDto.enabledById = req.user.userId;
    return this.orderItemFulfillmentService.create(
      createOrderItemFulfillmentDto,
    );
  }

  @Get()
  findAll() {
    return this.orderItemFulfillmentService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(OrderItemFulfillmentParameterSchema))
  search(@Body() query) {
    return this.orderItemFulfillmentService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemFulfillmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemFulfillmentDto: UpdateOrderItemFulfillmentDto,
  ) {
    return this.orderItemFulfillmentService.update(
      id,
      updateOrderItemFulfillmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemFulfillmentService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.orderItemFulfillmentService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.orderItemFulfillmentService.disable(id, req.user.userId);
  }
}

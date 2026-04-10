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
import { OrderPaymentService } from './order-payment.service';
import {
  CreateOrderPaymentDto,
  CreateOrderPaymentSchema,
} from './dto/create-order-payment.dto';
import { UpdateOrderPaymentDto } from './dto/update-order-payment.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { OrderPaymentParameterSchema } from './entities/order-payment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order-payment')
@UseGuards(JwtAuthGuard)
export class OrderPaymentController {
  constructor(private readonly orderPaymentService: OrderPaymentService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateOrderPaymentSchema))
  create(@Body() createOrderPaymentDto: CreateOrderPaymentDto, @Req() req) {
    createOrderPaymentDto.enabledById = req.user.userId;
    return this.orderPaymentService.create(createOrderPaymentDto);
  }

  // bulk create
  @Post('/bulk')
  // @UsePipes(new ZodValidationPipe(CreateOrderPaymentSchema))
  createBulk(@Body() createOrderPaymentDto: CreateOrderPaymentDto[]) {
    return this.orderPaymentService.createBulk(createOrderPaymentDto);
  }

  @Get()
  findAll() {
    return this.orderPaymentService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(OrderPaymentParameterSchema))
  search(@Body() query) {
    return this.orderPaymentService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderPaymentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderPaymentDto: UpdateOrderPaymentDto,
  ) {
    return this.orderPaymentService.update(id, updateOrderPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderPaymentService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.orderPaymentService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.orderPaymentService.disable(id, req.user.userId);
  }
}

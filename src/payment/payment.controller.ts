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
import { PaymentService } from './payment.service';
import {
  CreatePaymentDto,
  CreatePaymentSchema,
} from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { PaymentParameterSchema } from './entities/payment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePaymentSchema))
  @Permissions('canAddPayment')
  create(@Body() createPaymentDto: CreatePaymentDto, @Req() req) {
    createPaymentDto.enabledById = req.user.userId;
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @Permissions('canViewPayment')
  findAll() {
    return this.paymentService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(PaymentParameterSchema))
  @Permissions('canViewPayment')
  search(@Body() query) {
    return this.paymentService.filter(query);
  }

  @Get(':id')
  @Permissions('canViewPayment')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.paymentService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.paymentService.disable(id, req.user.userId);
  }
}

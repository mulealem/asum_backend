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
import { PaymentOptionService } from './payment-option.service';
import {
  CreatePaymentOptionDto,
  CreatePaymentOptionSchema,
} from './dto/create-payment-option.dto';
import { UpdatePaymentOptionDto } from './dto/update-payment-option.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { PaymentOptionParameterSchema } from './entities/payment-option.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payment-option')
@UseGuards(JwtAuthGuard)
export class PaymentOptionController {
  constructor(private readonly paymentOptionService: PaymentOptionService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePaymentOptionSchema))
  create(@Body() createPaymentOptionDto: CreatePaymentOptionDto, @Req() req) {
    createPaymentOptionDto.enabledById = req.user.userId;
    return this.paymentOptionService.create(createPaymentOptionDto);
  }

  @Get()
  findAll() {
    return this.paymentOptionService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(PaymentOptionParameterSchema))
  search(@Body() query) {
    return this.paymentOptionService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentOptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentOptionDto: UpdatePaymentOptionDto,
  ) {
    return this.paymentOptionService.update(id, updatePaymentOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentOptionService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.paymentOptionService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.paymentOptionService.disable(id, req.user.userId);
  }
}

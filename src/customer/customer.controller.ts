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
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  CreateCustomerSchema,
} from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { CustomerParameterSchema } from './entities/customer.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCustomerSchema))
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() req) {
    createCustomerDto.enabledById = req.user.userId;
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(CustomerParameterSchema))
  search(@Body() query) {
    return this.customerService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.customerService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.customerService.disable(id, req.user.userId);
  }
}

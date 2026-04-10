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
import { BankService } from './bank.service';
import { CreateBankDto, CreateBankSchema } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { BankParameterSchema } from './entities/bank.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bank')
@UseGuards(JwtAuthGuard)
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBankSchema))
  create(@Body() createBankDto: CreateBankDto, @Req() req) {
    createBankDto.enabledById = req.user.userId;
    return this.bankService.create(createBankDto);
  }

  @Get()
  findAll() {
    return this.bankService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(BankParameterSchema))
  search(@Body() query) {
    return this.bankService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.update(id, updateBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.bankService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.bankService.disable(id, req.user.userId);
  }
}

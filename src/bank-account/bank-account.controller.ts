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
import { BankAccountService } from './bank-account.service';
import {
  CreateBankAccountDto,
  CreateBankAccountSchema,
} from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { BankAccountParameterSchema } from './entities/bank-account.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bank-account')
@UseGuards(JwtAuthGuard)
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBankAccountSchema))
  create(@Body() createBankAccountDto: CreateBankAccountDto, @Req() req) {
    createBankAccountDto.enabledById = req.user.userId;
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Get()
  findAll() {
    return this.bankAccountService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(BankAccountParameterSchema))
  search(@Body() query) {
    return this.bankAccountService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountService.update(id, updateBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.bankAccountService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.bankAccountService.disable(id, req.user.userId);
  }
}

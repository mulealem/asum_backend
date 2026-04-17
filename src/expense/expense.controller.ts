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
import { ExpenseService } from './expense.service';
import {
  CreateExpenseDto,
  CreateExpenseSchema,
} from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ExpenseParameterSchema } from './entities/expense.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateExpenseSchema))
  create(@Body() createExpenseDto: CreateExpenseDto, @Req() req) {
    createExpenseDto.enabledById = req.user.userId;
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ExpenseParameterSchema))
  search(@Body() query) {
    return this.expenseService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.expenseService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.expenseService.disable(id, req.user.userId);
  }
}

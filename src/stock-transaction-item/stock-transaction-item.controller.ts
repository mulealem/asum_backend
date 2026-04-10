import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { StockTransactionItemService } from './stock-transaction-item.service';
import {
  CreateStockTransactionItemDto,
  CreateStockTransactionItemSchema,
} from './dto/create-stock-transaction-item.dto';
import { UpdateStockTransactionItemDto } from './dto/update-stock-transaction-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { StockTransactionItemSchema } from './entities/stock-transaction-item.entity';

@Controller('stock-transaction-item')
@UseGuards(JwtAuthGuard)
export class StockTransactionItemController {
  constructor(
    private readonly stockTransactionItemService: StockTransactionItemService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateStockTransactionItemSchema))
  create(
    @Body() createStockTransactionItemDto: CreateStockTransactionItemDto,
    @Req() req,
  ) {
    createStockTransactionItemDto.enabledById = req.user.userId;
    return this.stockTransactionItemService.create(
      createStockTransactionItemDto,
    );
  }

  @Get()
  findAll() {
    return this.stockTransactionItemService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(StockTransactionItemSchema))
  search(@Body() query) {
    return this.stockTransactionItemService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockTransactionItemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockTransactionItemDto: UpdateStockTransactionItemDto,
  ) {
    return this.stockTransactionItemService.update(
      id,
      updateStockTransactionItemDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockTransactionItemService.remove(id);
  }
}

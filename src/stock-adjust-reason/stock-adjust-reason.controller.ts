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
import { StockAdjustReasonService } from './stock-adjust-reason.service';
import {
  CreateStockAdjustReasonDto,
  CreateStockAdjustReasonSchema,
} from './dto/create-stock-adjust-reason.dto';
import { UpdateStockAdjustReasonDto } from './dto/update-stock-adjust-reason.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { StockAdjustReasonParameterSchema } from './entities/stock-adjust-reason.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('stock-adjust-reason')
@UseGuards(JwtAuthGuard)
export class StockAdjustReasonController {
  constructor(
    private readonly stockAdjustReasonService: StockAdjustReasonService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateStockAdjustReasonSchema))
  create(
    @Body() createStockAdjustReasonDto: CreateStockAdjustReasonDto,
    @Req() req,
  ) {
    createStockAdjustReasonDto.enabledById = req.user.userId;
    return this.stockAdjustReasonService.create(createStockAdjustReasonDto);
  }

  @Get()
  findAll() {
    return this.stockAdjustReasonService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(StockAdjustReasonParameterSchema))
  search(@Body() query) {
    return this.stockAdjustReasonService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockAdjustReasonService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockAdjustReasonDto: UpdateStockAdjustReasonDto,
  ) {
    return this.stockAdjustReasonService.update(id, updateStockAdjustReasonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockAdjustReasonService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.stockAdjustReasonService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.stockAdjustReasonService.disable(id, req.user.userId);
  }
}

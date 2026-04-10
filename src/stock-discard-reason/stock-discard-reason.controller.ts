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
import { StockDiscardReasonService } from './stock-discard-reason.service';
import {
  CreateStockDiscardReasonDto,
  CreateStockDiscardReasonSchema,
} from './dto/create-stock-discard-reason.dto';
import { UpdateStockDiscardReasonDto } from './dto/update-stock-discard-reason.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { StockDiscardReasonParameterSchema } from './entities/stock-discard-reason.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('stock-discard-reason')
@UseGuards(JwtAuthGuard)
export class StockDiscardReasonController {
  constructor(
    private readonly stockDiscardReasonService: StockDiscardReasonService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateStockDiscardReasonSchema))
  create(
    @Body() createStockDiscardReasonDto: CreateStockDiscardReasonDto,
    @Req() req,
  ) {
    createStockDiscardReasonDto.enabledById = req.user.userId;
    return this.stockDiscardReasonService.create(createStockDiscardReasonDto);
  }

  @Get()
  findAll() {
    return this.stockDiscardReasonService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(StockDiscardReasonParameterSchema))
  search(@Body() query) {
    return this.stockDiscardReasonService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockDiscardReasonService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockDiscardReasonDto: UpdateStockDiscardReasonDto,
  ) {
    return this.stockDiscardReasonService.update(
      id,
      updateStockDiscardReasonDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockDiscardReasonService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.stockDiscardReasonService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.stockDiscardReasonService.disable(id, req.user.userId);
  }
}

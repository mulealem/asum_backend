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
import { StockAdjustmentService } from './stock-adjustment.service';
import {
  CreateStockAdjustmentDto,
  CreateStockAdjustmentSchema,
} from './dto/create-stock-adjustment.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { StockAdjustmentParameterSchema } from './entities/stock-adjustment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('stock-adjustment')
@UseGuards(JwtAuthGuard)
export class StockAdjustmentController {
  constructor(
    private readonly stockAdjustmentService: StockAdjustmentService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateStockAdjustmentSchema))
  @Permissions('canAddInventory')
  create(@Body() dto: CreateStockAdjustmentDto, @Req() req) {
    dto.enabledById = req.user.userId;
    return this.stockAdjustmentService.create(dto);
  }

  @Get()
  @Permissions('canViewInventoryDetail')
  findAll() {
    return this.stockAdjustmentService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(StockAdjustmentParameterSchema))
  @Permissions('canViewInventoryDetail')
  search(@Body() query) {
    return this.stockAdjustmentService.filter(query);
  }

  @Get(':id')
  @Permissions('canViewInventoryDetail')
  findOne(@Param('id') id: string) {
    return this.stockAdjustmentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockAdjustmentService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.stockAdjustmentService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.stockAdjustmentService.disable(id, req.user.userId);
  }
}

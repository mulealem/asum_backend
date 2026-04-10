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
  Query,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto, CreateStockSchema } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { StockParameterSchema } from './entities/stock.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('stock')
@UseGuards(JwtAuthGuard)
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateStockSchema))
  @Permissions('canAddInventory')
  create(@Body() createStockDto: CreateStockDto, @Req() req) {
    createStockDto.enabledById = req.user.userId;
    return this.stockService.create(createStockDto);
  }

  @Get()
  @Permissions('canViewInventory')
  findAll() {
    return this.stockService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(StockParameterSchema))
  @Permissions('canViewInventory')
  search(@Body() query) {
    return this.stockService.filter(query);
  }

  @Post('/overview')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(StockParameterSchema))
  @Permissions('canViewInventory')
  overview(@Body() query) {
    return this.stockService.overview(query);
  }

  @Get('/available/:typeOfProductId')
  @Permissions('canViewInventoryDetail')
  availableStock(
    @Param('typeOfProductId') typeOfProductId: string,
    @Query('locationId') locationId?: string,
  ) {
    return this.stockService.availableStock(typeOfProductId, locationId);
  }

  @Get(':id')
  @Permissions('canViewInventoryDetail')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.stockService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.stockService.disable(id, req.user.userId);
  }
}

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
import { StockSourceService } from './stock-source.service';
import {
  CreateStockSourceDto,
  CreateStockSourceSchema,
} from './dto/create-stock-source.dto';
import { UpdateStockSourceDto } from './dto/update-stock-source.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { StockSourceParameterSchema } from './entities/stock-source.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('stock-source')
@UseGuards(JwtAuthGuard)
export class StockSourceController {
  constructor(private readonly stockSourceService: StockSourceService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateStockSourceSchema))
  create(@Body() createStockSourceDto: CreateStockSourceDto, @Req() req) {
    createStockSourceDto.enabledById = req.user.userId;
    return this.stockSourceService.create(createStockSourceDto);
  }

  @Get()
  findAll() {
    return this.stockSourceService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(StockSourceParameterSchema))
  search(@Body() query) {
    return this.stockSourceService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockSourceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockSourceDto: UpdateStockSourceDto,
  ) {
    return this.stockSourceService.update(id, updateStockSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockSourceService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.stockSourceService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.stockSourceService.disable(id, req.user.userId);
  }
}

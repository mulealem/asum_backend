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
import { DiscardedStockService } from './discarded-stock.service';
import {
  CreateDiscardedStockDto,
  CreateDiscardedStockSchema,
} from './dto/create-discarded-stock.dto';
import { UpdateDiscardedStockDto } from './dto/update-discarded-stock.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { DiscardedStockParameterSchema } from './entities/discarded-stock.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('discarded-stock')
@UseGuards(JwtAuthGuard)
export class DiscardedStockController {
  constructor(private readonly discardedStockService: DiscardedStockService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateDiscardedStockSchema))
  @Permissions('canAddInventory')
  create(@Body() createDiscardedStockDto: CreateDiscardedStockDto, @Req() req) {
    createDiscardedStockDto.enabledById = req.user.userId;
    return this.discardedStockService.create(createDiscardedStockDto);
  }

  @Get()
  @Permissions('canViewInventoryDetail')
  findAll() {
    return this.discardedStockService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(DiscardedStockParameterSchema))
  @Permissions('canViewInventoryDetail')
  search(@Body() query) {
    return this.discardedStockService.filter(query);
  }

  @Get(':id')
  @Permissions('canViewInventoryDetail')
  findOne(@Param('id') id: string) {
    return this.discardedStockService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscardedStockDto: UpdateDiscardedStockDto,
  ) {
    return this.discardedStockService.update(id, updateDiscardedStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discardedStockService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.discardedStockService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.discardedStockService.disable(id, req.user.userId);
  }
}

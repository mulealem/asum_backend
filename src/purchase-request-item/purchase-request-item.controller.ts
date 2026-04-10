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
import { PurchaseRequestItemService } from './purchase-request-item.service';
import {
  CreatePurchaseRequestItemDto,
  CreatePurchaseRequestItemSchema,
} from './dto/create-purchase-request-item.dto';
import { UpdatePurchaseRequestItemDto } from './dto/update-purchase-request-item.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { PurchaseRequestItemParameterSchema } from './entities/purchase-request-item.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('purchase-request-item')
@UseGuards(JwtAuthGuard)
export class PurchaseRequestItemController {
  constructor(
    private readonly purchaseRequestItemService: PurchaseRequestItemService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePurchaseRequestItemSchema))
  @Permissions('canCreatePurchaseRequest')
  create(@Body() dto: CreatePurchaseRequestItemDto, @Req() req) {
    dto.enabledById = req.user.userId;
    return this.purchaseRequestItemService.create(dto);
  }

  @Get()
  @Permissions('canViewPurchaseRequestDetail')
  findAll() {
    return this.purchaseRequestItemService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(PurchaseRequestItemParameterSchema))
  @Permissions('canViewPurchaseRequestDetail')
  search(@Body() query) {
    return this.purchaseRequestItemService.filter(query);
  }

  @Get(':id')
  @Permissions('canViewPurchaseRequestDetail')
  findOne(@Param('id') id: string) {
    return this.purchaseRequestItemService.findOne(id);
  }

  @Patch(':id')
  @Permissions('canCreatePurchaseRequest')
  update(@Param('id') id: string, @Body() dto: UpdatePurchaseRequestItemDto) {
    return this.purchaseRequestItemService.update(id, dto);
  }

  @Patch(':id/receive')
  @Permissions('canReceivePurchaseRequest')
  receiveItem(
    @Param('id') id: string,
    @Body() body: { receivedQuantity: number },
  ) {
    return this.purchaseRequestItemService.receiveItem(
      id,
      body.receivedQuantity,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseRequestItemService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.purchaseRequestItemService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.purchaseRequestItemService.disable(id, req.user.userId);
  }
}

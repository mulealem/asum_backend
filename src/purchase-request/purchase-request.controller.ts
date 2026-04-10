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
import { PurchaseRequestService } from './purchase-request.service';
import {
  CreatePurchaseRequestDto,
  CreatePurchaseRequestSchema,
} from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { PurchaseRequestParameterSchema } from './entities/purchase-request.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('purchase-request')
@UseGuards(JwtAuthGuard)
export class PurchaseRequestController {
  constructor(
    private readonly purchaseRequestService: PurchaseRequestService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePurchaseRequestSchema))
  @Permissions('canCreatePurchaseRequest')
  create(@Body() dto: CreatePurchaseRequestDto, @Req() req) {
    dto.enabledById = req.user.userId;
    return this.purchaseRequestService.create(dto);
  }

  @Get()
  @Permissions('canViewPurchaseRequests')
  findAll() {
    return this.purchaseRequestService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(PurchaseRequestParameterSchema))
  @Permissions('canViewPurchaseRequests')
  search(@Body() query) {
    return this.purchaseRequestService.filter(query);
  }

  @Get(':id')
  @Permissions('canViewPurchaseRequestDetail')
  findOne(@Param('id') id: string) {
    return this.purchaseRequestService.findOne(id);
  }

  @Patch(':id')
  @Permissions('canCreatePurchaseRequest')
  update(@Param('id') id: string, @Body() dto: UpdatePurchaseRequestDto) {
    return this.purchaseRequestService.update(id, dto);
  }

  @Patch(':id/submit')
  @Permissions('canCreatePurchaseRequest')
  submit(@Param('id') id: string) {
    return this.purchaseRequestService.submit(id);
  }

  @Patch(':id/approve')
  @Permissions('canApprovePurchaseRequest')
  approve(@Param('id') id: string, @Req() req) {
    return this.purchaseRequestService.approve(id, req.user.userId);
  }

  @Patch(':id/reject')
  @Permissions('canApprovePurchaseRequest')
  reject(@Param('id') id: string, @Req() req) {
    return this.purchaseRequestService.reject(id, req.user.userId);
  }

  @Patch(':id/mark-ordered')
  @Permissions('canCreatePurchaseRequest')
  markOrdered(@Param('id') id: string) {
    return this.purchaseRequestService.markOrdered(id);
  }

  @Patch(':id/receive')
  @Permissions('canReceivePurchaseRequest')
  receive(@Param('id') id: string) {
    return this.purchaseRequestService.receive(id);
  }

  @Patch(':id/cancel')
  @Permissions('canCreatePurchaseRequest')
  cancel(@Param('id') id: string) {
    return this.purchaseRequestService.cancel(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseRequestService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.purchaseRequestService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.purchaseRequestService.disable(id, req.user.userId);
  }
}

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
import { ShipmentItemService } from './shipment-item.service';
import {
  CreateShipmentItemDto,
  CreateShipmentItemSchema,
} from './dto/create-shipment-item.dto';
import { UpdateShipmentItemDto } from './dto/update-shipment-item.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ShipmentItemParameterSchema } from './entities/shipment-item.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shipment-item')
@UseGuards(JwtAuthGuard)
export class ShipmentItemController {
  constructor(private readonly productVariantService: ShipmentItemService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateShipmentItemSchema))
  create(@Body() createShipmentItemDto: CreateShipmentItemDto, @Req() req) {
    createShipmentItemDto.enabledById = req.user.userId;
    return this.productVariantService.create(createShipmentItemDto);
  }

  @Post('/create-many')
  // @UsePipes(new ZodValidationPipe(CreateShipmentItemSchema))
  createMany(
    @Body() createShipmentItemDto: CreateShipmentItemDto[],
    @Req() req,
  ) {
    console.log(req.user);

    let createShipmentItems = createShipmentItemDto.map((item) => {
      return {
        ...item,
        enabledById: req.user.userId,
      };
    }) as any[];
    // {
    //   ...createShipmentItemDto,
    //   enabledById: req.user.userId,
    // }

    return this.productVariantService.createMany(createShipmentItems);
  }

  @Get()
  findAll() {
    return this.productVariantService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ShipmentItemParameterSchema))
  search(@Body() query) {
    return this.productVariantService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShipmentItemDto: UpdateShipmentItemDto,
  ) {
    return this.productVariantService.update(id, updateShipmentItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.productVariantService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.productVariantService.disable(id, req.user.userId);
  }
}

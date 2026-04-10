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
import { LocationService } from './location.service';
import {
  CreateLocationDto,
  CreateLocationSchema,
} from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { LocationParameterSchema } from './entities/location.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('location')
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateLocationSchema))
  create(@Body() createLocationDto: CreateLocationDto, @Req() req) {
    createLocationDto.enabledById = req.user.userId;
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(LocationParameterSchema))
  search(@Body() query) {
    return this.locationService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.locationService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.locationService.disable(id, req.user.userId);
  }
}

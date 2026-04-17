import {
  Controller,
  Get,
  Patch,
  Body,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrganizationSettingService } from './organization-setting.service';
import {
  UpdateOrganizationSettingDto,
  UpdateOrganizationSettingSchema,
} from './dto/update-organization-setting.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('organization-setting')
export class OrganizationSettingController {
  constructor(
    private readonly organizationSettingService: OrganizationSettingService,
  ) {}

  @Get()
  get() {
    return this.organizationSettingService.get();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(UpdateOrganizationSettingSchema))
  update(@Body() dto: UpdateOrganizationSettingDto, @Req() req) {
    dto.updatedById = req.user.userId;
    return this.organizationSettingService.upsert(dto);
  }
}

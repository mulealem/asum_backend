import { Module } from '@nestjs/common';
import { OrganizationSettingService } from './organization-setting.service';
import { OrganizationSettingController } from './organization-setting.controller';

@Module({
  controllers: [OrganizationSettingController],
  providers: [OrganizationSettingService],
})
export class OrganizationSettingModule {}

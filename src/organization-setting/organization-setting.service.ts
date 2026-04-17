import { Injectable } from '@nestjs/common';
import { UpdateOrganizationSettingDto } from './dto/update-organization-setting.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrganizationSettingService {
  constructor(private prisma: PrismaService) {}

  async get() {
    return this.prisma.organizationSetting.findFirst();
  }

  async upsert(data: UpdateOrganizationSettingDto) {
    const existing = await this.prisma.organizationSetting.findFirst();

    if (existing) {
      return this.prisma.organizationSetting.update({
        where: { id: existing.id },
        data,
      });
    }

    return this.prisma.organizationSetting.create({
      data: { name: data.name!, ...data },
    });
  }
}

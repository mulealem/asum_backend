import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserRoleDto) {
    return this.prisma.userRole.create({ data });
  }

  findAll() {
    return this.prisma.userRole.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.userRole.findMany({
      where: {
        AND: [
          query.userIds ? { userId: { in: query.userIds } } : {},
          query.roleIds ? { roleId: { in: query.roleIds } } : {},
          query.ids ? { id: { in: query.ids } } : {},
          query.enabledByIds ? { enabledById: query.enabledByIds } : {},
          query.disabledByIds ? { disabledById: query.disabledByIds } : {},
          query.isEnabled ? { isEnabled: query.isEnabled } : {},
          query.enabledStartDate
            ? { createdAt: { gte: query.enabledStartDate } }
            : {},
          query.enabledEndDate
            ? { createdAt: { lte: query.enabledEndDate } }
            : {},
          query.disabledStartDate
            ? { disabledDate: { gte: query.disabledStartDate } }
            : {},
          query.disabledEndDate
            ? { disabledDate: { lte: query.disabledEndDate } }
            : {},
        ],
      },
    });
  }

  findOne(id: string) {
    return this.prisma.userRole.findUnique({ where: { id } });
  }

  update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.prisma.userRole.update({
      where: { id },
      data: updateUserRoleDto,
    });
  }

  enable(id: string) {
    return this.prisma.userRole.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.userRole.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.userRole.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

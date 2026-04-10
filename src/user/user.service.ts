import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

type UserWithPassword = {
  password?: string;
};

function stripPassword<T extends UserWithPassword | null>(user: T) {
  if (!user) {
    return user;
  }

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(data.password);

    // Save the user in the database

    const { roleIds, ...userData } = data;

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        userRoles: {
          createMany: {
            data: roleIds.map((id) => ({
              roleId: id,
            })),
            // createMany: [roleIds.map((id) => ({
            //   roleId: id,
            // }))],
          },
        },
      },
    });

    return stripPassword(user);
  }

  findAll() {
    return this.prisma.user
      .findMany({
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      })
      .then((users) => users.map((user) => stripPassword(user)));
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.user
      .findMany({
        where: {
          AND: [
            query.name ? { name: query.name } : {},
            query.email ? { email: query.email } : {},
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
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      })
      .then((users) => users.map((user) => stripPassword(user)));
  }

  findOne(id: string) {
    return this.prisma.user
      .findUnique({
        where: { id },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      })
      .then((user) => stripPassword(user));
  }

  current(id: string) {
    return this.prisma.user
      .findUnique({
        where: { id },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      })
      .then((user) => stripPassword(user));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { roleIds, ...userData } = updateUserDto;

    // if new roles are provided, delete the old ones and add the new ones
    if (roleIds) {
      await this.prisma.userRole.deleteMany({
        where: {
          userId: id,
        },
      });

      await this.prisma.userRole.createMany({
        data: roleIds.map((roleId) => ({
          userId: id,
          roleId,
        })),
      });
    }

    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async updatePassword(data: any) {
    console.log(data);
    const hashedPassword = await this.hashPassword(data.password);
    return this.prisma.user.update({
      where: { id: data.userId },
      data: { password: hashedPassword },
    });
  }

  enable(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

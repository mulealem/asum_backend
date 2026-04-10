import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // Validate user with credentials (replace with actual user validation logic)
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: {
        userRoles: {
          where: { isEnabled: true },
          include: {
            role: {
              select: { permissions: true, isEnabled: true },
            },
          },
        },
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const {
        password: _password,
        enabledById,
        disabledById,
        disabledDate,
        ...userWithoutPassword
      } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  // Sign a JWT
  async login(user: any) {
    const permissions = (user.userRoles || [])
      .filter((ur: any) => ur.role?.isEnabled)
      .flatMap((ur: any) => {
        try {
          return JSON.parse(ur.role.permissions);
        } catch {
          return ur.role.permissions.split(',').map((p: string) => p.trim());
        }
      });

    const payload = {
      name: user.name,
      email: user.email,
      isEnabled: user.isEnabled,
      sub: user.id,
      permissions: [...new Set(permissions)],
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

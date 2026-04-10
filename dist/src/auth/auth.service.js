"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async validateUser(email, password) {
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
            const { password: _password, enabledById, disabledById, disabledDate, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async login(user) {
        const permissions = (user.userRoles || [])
            .filter((ur) => ur.role?.isEnabled)
            .flatMap((ur) => {
            try {
                return JSON.parse(ur.role.permissions);
            }
            catch {
                return ur.role.permissions.split(',').map((p) => p.trim());
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
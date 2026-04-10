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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
function stripPassword(user) {
    if (!user) {
        return user;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async create(data) {
        const existingUser = await this.prisma.user.findFirst({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await this.hashPassword(data.password);
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
    filter(query) {
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
    findOne(id) {
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
    current(id) {
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
    async update(id, updateUserDto) {
        const { roleIds, ...userData } = updateUserDto;
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
    async updatePassword(data) {
        console.log(data);
        const hashedPassword = await this.hashPassword(data.password);
        return this.prisma.user.update({
            where: { id: data.userId },
            data: { password: hashedPassword },
        });
    }
    enable(id) {
        return this.prisma.user.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.user.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.user.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map
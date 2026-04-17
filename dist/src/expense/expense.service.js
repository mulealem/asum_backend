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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma.service");
let ExpenseService = class ExpenseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        const { bankAccountId, enabledById, ...rest } = data;
        return this.prisma.$transaction(async (tx) => {
            const expense = await tx.expense.create({
                data: {
                    ...rest,
                    bankAccount: { connect: { id: bankAccountId } },
                    enabledBy: enabledById ? { connect: { id: enabledById } } : undefined,
                },
                include: { bankAccount: { include: { bank: true } } },
            });
            await tx.bankLedgerEntry.create({
                data: {
                    direction: client_1.LedgerDirection.DEBIT,
                    amount: expense.amount,
                    note: expense.description ?? expense.category,
                    bankAccount: { connect: { id: bankAccountId } },
                    expense: { connect: { id: expense.id } },
                    enabledBy: enabledById ? { connect: { id: enabledById } } : undefined,
                },
            });
            return expense;
        });
    }
    findAll() {
        return this.prisma.expense.findMany({
            include: { bankAccount: { include: { bank: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string')
            query.ids = [query.ids];
        return this.prisma.expense.findMany({
            where: {
                AND: [
                    query.ids ? { id: { in: query.ids } } : {},
                    query.categories ? { category: { in: query.categories } } : {},
                    query.bankAccountIds
                        ? { bankAccountId: { in: query.bankAccountIds } }
                        : {},
                    query.isEnabled !== undefined ? { isEnabled: query.isEnabled } : {},
                    query.enabledByIds ? { enabledById: { in: query.enabledByIds } } : {},
                    query.disabledByIds
                        ? { disabledById: { in: query.disabledByIds } }
                        : {},
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
                    query.minAmount ? { amount: { gte: query.minAmount } } : {},
                    query.maxAmount ? { amount: { lte: query.maxAmount } } : {},
                ],
            },
            include: { bankAccount: { include: { bank: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    findOne(id) {
        return this.prisma.expense.findUnique({
            where: { id },
            include: { bankAccount: { include: { bank: true } } },
        });
    }
    update(id, updateExpenseDto) {
        return this.prisma.expense.update({
            where: { id },
            data: updateExpenseDto,
        });
    }
    enable(id) {
        return this.prisma.expense.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.expense.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.expense.update({
            where: { id },
            data: { isEnabled: false, disabledDate: new Date() },
        });
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map
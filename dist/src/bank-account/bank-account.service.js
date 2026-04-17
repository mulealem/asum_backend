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
exports.BankAccountService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let BankAccountService = class BankAccountService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.bankAccount.create({ data });
    }
    findAll() {
        return this.prisma.bankAccount.findMany({
            include: {
                bank: true,
            },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.bankAccount.findMany({
            where: {
                AND: [
                    query.ids ? { id: { in: query.ids } } : {},
                    query.bankIds ? { bankId: { in: query.bankIds } } : {},
                    query.accountNumber ? { accountNumber: query.accountNumber } : {},
                    query.accountName ? { accountName: query.accountName } : {},
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
                bank: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.bankAccount.findUnique({
            where: { id },
            include: {
                bank: true,
            },
        });
    }
    update(id, updateBankAccountDto) {
        return this.prisma.bankAccount.update({
            where: { id },
            data: updateBankAccountDto,
        });
    }
    enable(id) {
        return this.prisma.bankAccount.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.bankAccount.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.bankAccount.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
    async getBalance(id) {
        const entries = await this.prisma.bankLedgerEntry.findMany({
            where: { bankAccountId: id, isEnabled: true },
            select: { direction: true, amount: true },
        });
        const balance = entries.reduce((acc, entry) => {
            return entry.direction === client_1.LedgerDirection.CREDIT
                ? acc + entry.amount
                : acc - entry.amount;
        }, 0);
        return { bankAccountId: id, balance };
    }
    async getStatement(id, startDate, endDate) {
        const entries = await this.prisma.bankLedgerEntry.findMany({
            where: {
                bankAccountId: id,
                isEnabled: true,
                ...(startDate || endDate
                    ? {
                        createdAt: {
                            ...(startDate ? { gte: startDate } : {}),
                            ...(endDate ? { lte: endDate } : {}),
                        },
                    }
                    : {}),
            },
            include: {
                payment: { select: { id: true, amount: true, receiptNumber: true } },
                expense: { select: { id: true, category: true, description: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
        let runningBalance = 0;
        const rows = entries.map((entry) => {
            runningBalance +=
                entry.direction === client_1.LedgerDirection.CREDIT
                    ? entry.amount
                    : -entry.amount;
            return { ...entry, runningBalance };
        });
        const totalCredits = entries
            .filter((e) => e.direction === client_1.LedgerDirection.CREDIT)
            .reduce((s, e) => s + e.amount, 0);
        const totalDebits = entries
            .filter((e) => e.direction === client_1.LedgerDirection.DEBIT)
            .reduce((s, e) => s + e.amount, 0);
        return {
            bankAccountId: id,
            totalCredits,
            totalDebits,
            closingBalance: totalCredits - totalDebits,
            entries: rows,
        };
    }
};
exports.BankAccountService = BankAccountService;
exports.BankAccountService = BankAccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BankAccountService);
//# sourceMappingURL=bank-account.service.js.map
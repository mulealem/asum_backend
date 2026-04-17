import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from '../prisma.service';
import { LedgerDirection } from '@prisma/client';

@Injectable()
export class BankAccountService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBankAccountDto) {
    return this.prisma.bankAccount.create({ data });
  }

  findAll() {
    return this.prisma.bankAccount.findMany({
      include: {
        bank: true,
      },
    });
  }

  filter(query: any) {
    // console.log(query);

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

  findOne(id: string) {
    return this.prisma.bankAccount.findUnique({
      where: { id },
      include: {
        bank: true,
      },
    });
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return this.prisma.bankAccount.update({
      where: { id },
      data: updateBankAccountDto,
    });
  }

  enable(id: string) {
    return this.prisma.bankAccount.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.bankAccount.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.bankAccount.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }

  async getBalance(id: string) {
    const entries = await this.prisma.bankLedgerEntry.findMany({
      where: { bankAccountId: id, isEnabled: true },
      select: { direction: true, amount: true },
    });

    const balance = entries.reduce((acc, entry) => {
      return entry.direction === LedgerDirection.CREDIT
        ? acc + entry.amount
        : acc - entry.amount;
    }, 0);

    return { bankAccountId: id, balance };
  }

  async getStatement(id: string, startDate?: Date, endDate?: Date) {
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
        entry.direction === LedgerDirection.CREDIT
          ? entry.amount
          : -entry.amount;
      return { ...entry, runningBalance };
    });

    const totalCredits = entries
      .filter((e) => e.direction === LedgerDirection.CREDIT)
      .reduce((s, e) => s + e.amount, 0);
    const totalDebits = entries
      .filter((e) => e.direction === LedgerDirection.DEBIT)
      .reduce((s, e) => s + e.amount, 0);

    return {
      bankAccountId: id,
      totalCredits,
      totalDebits,
      closingBalance: totalCredits - totalDebits,
      entries: rows,
    };
  }
}

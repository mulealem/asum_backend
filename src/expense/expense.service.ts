import { Injectable } from '@nestjs/common';
import { LedgerDirection } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateExpenseDto) {
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
          direction: LedgerDirection.DEBIT,
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

  filter(query: any) {
    if (typeof query.ids === 'string') query.ids = [query.ids];

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

  findOne(id: string) {
    return this.prisma.expense.findUnique({
      where: { id },
      include: { bankAccount: { include: { bank: true } } },
    });
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  enable(id: string) {
    return this.prisma.expense.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.expense.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.expense.update({
      where: { id },
      data: { isEnabled: false, disabledDate: new Date() },
    });
  }
}

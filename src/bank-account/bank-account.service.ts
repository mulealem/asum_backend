import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from '../prisma.service';

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
}

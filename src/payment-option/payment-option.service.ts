import { Injectable } from '@nestjs/common';
import { CreatePaymentOptionDto } from './dto/create-payment-option.dto';
import { UpdatePaymentOptionDto } from './dto/update-payment-option.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentOptionService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePaymentOptionDto) {
    return this.prisma.paymentOption.create({ data });
  }

  findAll() {
    return this.prisma.paymentOption.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.paymentOption.findMany({
      where: {
        AND: [
          query.title ? { title: query.title } : {},
          query.abbreviation ? { abbreviation: query.abbreviation } : {},
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
    return this.prisma.paymentOption.findUnique({ where: { id } });
  }

  update(id: string, updatePaymentOptionDto: UpdatePaymentOptionDto) {
    return this.prisma.paymentOption.update({
      where: { id },
      data: updatePaymentOptionDto,
    });
  }

  enable(id: string) {
    return this.prisma.paymentOption.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.paymentOption.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.paymentOption.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

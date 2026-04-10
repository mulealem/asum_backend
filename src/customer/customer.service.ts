import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCustomerDto) {
    return this.prisma.customer.create({ data });
  }

  findAll() {
    return this.prisma.customer.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.customer.findMany({
      where: {
        AND: [
          query.search
            ? {
                OR: [
                  { name: { contains: query.search, mode: 'insensitive' } },
                  { phoneNumber: { contains: query.search } },
                  { tin: { contains: query.search } },
                ],
              }
            : {},
          query.name ? { name: query.name } : {},
          query.tin ? { tin: query.tin } : {},
          query.phoneNumber ? { phoneNumber: query.phoneNumber } : {},
          query.address ? { address: query.address } : {},
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
    return this.prisma.customer.findUnique({ where: { id } });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  enable(id: string) {
    return this.prisma.customer.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.customer.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.customer.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

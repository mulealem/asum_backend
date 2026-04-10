import { Injectable } from '@nestjs/common';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CarrierService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCarrierDto) {
    return this.prisma.carrier.create({ data });
  }

  findAll() {
    return this.prisma.carrier.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.carrier.findMany({
      where: {
        AND: [
          query.title ? { title: query.title } : {},
          query.carrierTypeIds ? { carrierTypeId: query.carrierTypeIds } : {},
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
    return this.prisma.carrier.findUnique({ where: { id } });
  }

  update(id: string, updateCarrierDto: UpdateCarrierDto) {
    return this.prisma.carrier.update({
      where: { id },
      data: updateCarrierDto,
    });
  }

  enable(id: string) {
    return this.prisma.carrier.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.carrier.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.carrier.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

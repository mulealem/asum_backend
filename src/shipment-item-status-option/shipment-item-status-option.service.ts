import { Injectable } from '@nestjs/common';
import { CreateShipmentItemStatusOptionDto } from './dto/create-shipment-item-status-option.dto';
import { UpdateShipmentItemStatusOptionDto } from './dto/update-shipment-item-status-option.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShipmentItemStatusOptionService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateShipmentItemStatusOptionDto) {
    return this.prisma.shipmentItemStatusOption.create({ data });
  }

  findAll() {
    return this.prisma.shipmentItemStatusOption.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.shipmentItemStatusOption.findMany({
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
    return this.prisma.shipmentItemStatusOption.findUnique({ where: { id } });
  }

  update(
    id: string,
    updateShipmentItemStatusOptionDto: UpdateShipmentItemStatusOptionDto,
  ) {
    return this.prisma.shipmentItemStatusOption.update({
      where: { id },
      data: updateShipmentItemStatusOptionDto,
    });
  }

  enable(id: string) {
    return this.prisma.shipmentItemStatusOption.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.shipmentItemStatusOption.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.shipmentItemStatusOption.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

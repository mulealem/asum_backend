import { Injectable } from '@nestjs/common';
import { CreateShipmentItemStatusDto } from './dto/create-shipment-item-status.dto';
import { UpdateShipmentItemStatusDto } from './dto/update-shipment-item-status.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShipmentItemStatusService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateShipmentItemStatusDto) {
    return this.prisma.shipmentItemStatus.create({ data });
  }

  findAll() {
    return this.prisma.shipmentItemStatus.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.shipmentItemStatus.findMany({
      where: {
        AND: [
          query.shipmentItemIds
            ? { shipmentItemId: { in: query.shipmentItemIds } }
            : {},
          query.statusIds ? { statusId: { in: query.statusIds } } : {},
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
    return this.prisma.shipmentItemStatus.findUnique({ where: { id } });
  }

  update(id: string, updateShipmentItemStatusDto: UpdateShipmentItemStatusDto) {
    return this.prisma.shipmentItemStatus.update({
      where: { id },
      data: updateShipmentItemStatusDto,
    });
  }

  enable(id: string) {
    return this.prisma.shipmentItemStatus.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.shipmentItemStatus.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.shipmentItemStatus.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

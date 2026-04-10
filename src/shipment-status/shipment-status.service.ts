import { Injectable } from '@nestjs/common';
import { CreateShipmentStatusDto } from './dto/create-shipment-status.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShipmentStatusService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateShipmentStatusDto) {
    return this.prisma.shipmentStatus.create({ data });
  }

  findAll() {
    return this.prisma.shipmentStatus.findMany({});
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.shipmentStatus.findMany({
      where: {
        AND: [
          query.shipmentIds ? { shipmentId: { in: query.shipmentIds } } : {},
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
    return this.prisma.shipmentStatus.findUnique({ where: { id } });
  }

  update(id: string, updateShipmentStatusDto: UpdateShipmentStatusDto) {
    return this.prisma.shipmentStatus.update({
      where: { id },
      data: updateShipmentStatusDto,
    });
  }

  enable(id: string) {
    return this.prisma.shipmentStatus.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.shipmentStatus.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.shipmentStatus.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}

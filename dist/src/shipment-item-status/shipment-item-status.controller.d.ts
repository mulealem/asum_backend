import { ShipmentItemStatusService } from './shipment-item-status.service';
import { CreateShipmentItemStatusDto } from './dto/create-shipment-item-status.dto';
import { UpdateShipmentItemStatusDto } from './dto/update-shipment-item-status.dto';
export declare class ShipmentItemStatusController {
    private readonly shipmentItemStatusService;
    constructor(shipmentItemStatusService: ShipmentItemStatusService);
    create(createShipmentItemStatusDto: CreateShipmentItemStatusDto): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentItemId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentItemId: string;
        statusId: string;
    }[]>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentItemId: string;
        statusId: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentItemId: string;
        statusId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateShipmentItemStatusDto: UpdateShipmentItemStatusDto): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentItemId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentItemId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentItemId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentItemId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

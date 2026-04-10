import { ShipmentItemStatusService } from './shipment-item-status.service';
import { CreateShipmentItemStatusDto } from './dto/create-shipment-item-status.dto';
import { UpdateShipmentItemStatusDto } from './dto/update-shipment-item-status.dto';
export declare class ShipmentItemStatusController {
    private readonly shipmentItemStatusService;
    constructor(shipmentItemStatusService: ShipmentItemStatusService);
    create(createShipmentItemStatusDto: CreateShipmentItemStatusDto): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        statusId: string;
        shipmentItemId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        statusId: string;
        shipmentItemId: string;
    }[]>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        statusId: string;
        shipmentItemId: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        statusId: string;
        shipmentItemId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateShipmentItemStatusDto: UpdateShipmentItemStatusDto): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        statusId: string;
        shipmentItemId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        statusId: string;
        shipmentItemId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        statusId: string;
        shipmentItemId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__ShipmentItemStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        statusId: string;
        shipmentItemId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

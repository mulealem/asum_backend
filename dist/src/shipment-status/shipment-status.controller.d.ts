import { ShipmentStatusService } from './shipment-status.service';
import { CreateShipmentStatusDto } from './dto/create-shipment-status.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
export declare class ShipmentStatusController {
    private readonly shipmentStatusService;
    constructor(shipmentStatusService: ShipmentStatusService);
    create(createShipmentStatusDto: CreateShipmentStatusDto, req: any): import(".prisma/client").Prisma.Prisma__ShipmentStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentId: string;
        statusId: string;
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
        shipmentId: string;
        statusId: string;
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
        shipmentId: string;
        statusId: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ShipmentStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentId: string;
        statusId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateShipmentStatusDto: UpdateShipmentStatusDto): import(".prisma/client").Prisma.Prisma__ShipmentStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ShipmentStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__ShipmentStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__ShipmentStatusClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        shipmentId: string;
        statusId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

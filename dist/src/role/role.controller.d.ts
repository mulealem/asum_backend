import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto, req: any): import(".prisma/client").Prisma.Prisma__RoleClient<{
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    }[]>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<{
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__RoleClient<{
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateRoleDto: UpdateRoleDto): import(".prisma/client").Prisma.Prisma__RoleClient<{
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__RoleClient<{
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__RoleClient<{
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__RoleClient<{
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

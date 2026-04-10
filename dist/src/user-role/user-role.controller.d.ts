import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UserRoleController {
    private readonly userRoleService;
    constructor(userRoleService: UserRoleService);
    create(createUserRoleDto: CreateUserRoleDto, req: any): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        roleId: string;
        userId: string;
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
        roleId: string;
        userId: string;
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
        roleId: string;
        userId: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        roleId: string;
        userId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateUserRoleDto: UpdateUserRoleDto): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        roleId: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        roleId: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        roleId: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        roleId: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<Omit<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }, "password">>;
    findAll(): Promise<Omit<{
        userRoles: ({
            role: {
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                enabledById: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
                title: string;
                permissions: string;
            };
        } & {
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            userId: string;
            roleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }, "password">[]>;
    search(query: any): Promise<Omit<{
        userRoles: ({
            role: {
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                enabledById: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
                title: string;
                permissions: string;
            };
        } & {
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            userId: string;
            roleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }, "password">[]>;
    me(req: any): Promise<Omit<{
        userRoles: ({
            role: {
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                enabledById: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
                title: string;
                permissions: string;
            };
        } & {
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            userId: string;
            roleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }, "password">>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updatePassword(data: any): Promise<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        phoneNumber: string | null;
        email: string;
        password: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

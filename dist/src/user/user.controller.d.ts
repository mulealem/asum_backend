import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<Omit<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }, "password">>;
    findAll(): Promise<Omit<{
        userRoles: ({
            role: {
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
            };
        } & {
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
        })[];
    } & {
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }, "password">[]>;
    search(query: any): Promise<Omit<{
        userRoles: ({
            role: {
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
            };
        } & {
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
        })[];
    } & {
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }, "password">[]>;
    me(req: any): Promise<Omit<{
        userRoles: ({
            role: {
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
            };
        } & {
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
        })[];
    } & {
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }, "password">>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updatePassword(data: any): Promise<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

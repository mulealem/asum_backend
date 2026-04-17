import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    create(createExpenseDto: CreateExpenseDto, req: any): Promise<{
        bankAccount: {
            bank: {
                title: string;
                abbreviation: string | null;
                description: string | null;
                enabledById: string | null;
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
            };
        } & {
            code: string | null;
            enabledById: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            name: string | null;
            bankId: string;
            branch: string | null;
            accountNumber: string;
            accountName: string;
        };
    } & {
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        referenceNumber: string | null;
        amount: number;
        bankAccountId: string;
        category: import(".prisma/client").$Enums.ExpenseCategory;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        bankAccount: {
            bank: {
                title: string;
                abbreviation: string | null;
                description: string | null;
                enabledById: string | null;
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
            };
        } & {
            code: string | null;
            enabledById: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            name: string | null;
            bankId: string;
            branch: string | null;
            accountNumber: string;
            accountName: string;
        };
    } & {
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        referenceNumber: string | null;
        amount: number;
        bankAccountId: string;
        category: import(".prisma/client").$Enums.ExpenseCategory;
    })[]>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<({
        bankAccount: {
            bank: {
                title: string;
                abbreviation: string | null;
                description: string | null;
                enabledById: string | null;
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
            };
        } & {
            code: string | null;
            enabledById: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            name: string | null;
            bankId: string;
            branch: string | null;
            accountNumber: string;
            accountName: string;
        };
    } & {
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        referenceNumber: string | null;
        amount: number;
        bankAccountId: string;
        category: import(".prisma/client").$Enums.ExpenseCategory;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        bankAccount: {
            bank: {
                title: string;
                abbreviation: string | null;
                description: string | null;
                enabledById: string | null;
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
            };
        } & {
            code: string | null;
            enabledById: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            name: string | null;
            bankId: string;
            branch: string | null;
            accountNumber: string;
            accountName: string;
        };
    } & {
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        referenceNumber: string | null;
        amount: number;
        bankAccountId: string;
        category: import(".prisma/client").$Enums.ExpenseCategory;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        referenceNumber: string | null;
        amount: number;
        bankAccountId: string;
        category: import(".prisma/client").$Enums.ExpenseCategory;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        referenceNumber: string | null;
        amount: number;
        bankAccountId: string;
        category: import(".prisma/client").$Enums.ExpenseCategory;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        referenceNumber: string | null;
        amount: number;
        bankAccountId: string;
        category: import(".prisma/client").$Enums.ExpenseCategory;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        referenceNumber: string | null;
        amount: number;
        bankAccountId: string;
        category: import(".prisma/client").$Enums.ExpenseCategory;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

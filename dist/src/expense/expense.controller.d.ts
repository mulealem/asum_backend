import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    create(createExpenseDto: CreateExpenseDto, req: any): Promise<{
        bankAccount: {
            bank: {
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                enabledById: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
                title: string;
                abbreviation: string | null;
                description: string | null;
            };
        } & {
            code: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
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
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        description: string | null;
        referenceNumber: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        bankAccountId: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        bankAccount: {
            bank: {
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                enabledById: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
                title: string;
                abbreviation: string | null;
                description: string | null;
            };
        } & {
            code: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
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
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        description: string | null;
        referenceNumber: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        bankAccountId: string;
    })[]>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<({
        bankAccount: {
            bank: {
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                enabledById: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
                title: string;
                abbreviation: string | null;
                description: string | null;
            };
        } & {
            code: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
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
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        description: string | null;
        referenceNumber: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        bankAccountId: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        bankAccount: {
            bank: {
                id: string;
                createdAt: Date;
                isEnabled: boolean;
                enableRemark: string | null;
                enabledById: string | null;
                disableRemark: string | null;
                disabledById: string | null;
                disabledDate: Date | null;
                title: string;
                abbreviation: string | null;
                description: string | null;
            };
        } & {
            code: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
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
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        description: string | null;
        referenceNumber: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        bankAccountId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        description: string | null;
        referenceNumber: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        bankAccountId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        description: string | null;
        referenceNumber: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        bankAccountId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        description: string | null;
        referenceNumber: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        bankAccountId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        description: string | null;
        referenceNumber: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        bankAccountId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from '../prisma.service';
export declare class BankAccountService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateBankAccountDto): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
    filter(query: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateBankAccountDto: UpdateBankAccountDto): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, disabledById: string): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getBalance(id: string): Promise<{
        bankAccountId: string;
        balance: number;
    }>;
    getStatement(id: string, startDate?: Date, endDate?: Date): Promise<{
        bankAccountId: string;
        totalCredits: number;
        totalDebits: number;
        closingBalance: number;
        entries: {
            runningBalance: number;
            payment: {
                id: string;
                receiptNumber: string;
                amount: number;
            };
            expense: {
                description: string;
                id: string;
                category: import(".prisma/client").$Enums.ExpenseCategory;
            };
            enabledById: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            paymentId: string | null;
            amount: number;
            bankAccountId: string;
            direction: import(".prisma/client").$Enums.LedgerDirection;
            note: string | null;
            expenseId: string | null;
        }[];
    }>;
}

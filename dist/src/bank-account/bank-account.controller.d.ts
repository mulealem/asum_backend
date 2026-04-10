import { BankAccountService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
export declare class BankAccountController {
    private readonly bankAccountService;
    constructor(bankAccountService: BankAccountService);
    create(createBankAccountDto: CreateBankAccountDto, req: any): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        bankId: string;
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
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        bankId: string;
        accountNumber: string;
        accountName: string;
    })[]>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<({
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
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        bankId: string;
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
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        bankId: string;
        accountNumber: string;
        accountName: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateBankAccountDto: UpdateBankAccountDto): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        bankId: string;
        accountNumber: string;
        accountName: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        bankId: string;
        accountNumber: string;
        accountName: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        bankId: string;
        accountNumber: string;
        accountName: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        bankId: string;
        accountNumber: string;
        accountName: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

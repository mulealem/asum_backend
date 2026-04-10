import { z } from 'zod';
export declare class CreateBankAccountDto {
    bankId: string;
    accountNumber: string;
    accountName: string;
    enabledById: string | null;
}
export declare const CreateBankAccountSchema: z.ZodObject<{
    bankId: z.ZodString;
    accountNumber: z.ZodString;
    accountName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bankId?: string;
    accountNumber?: string;
    accountName?: string;
}, {
    bankId?: string;
    accountNumber?: string;
    accountName?: string;
}>;

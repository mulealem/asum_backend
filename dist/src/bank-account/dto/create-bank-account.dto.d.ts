import { z } from 'zod';
export declare class CreateBankAccountDto {
    bankId: string;
    name: string;
    code: string;
    branch: string;
    accountNumber: string;
    accountName: string;
    enabledById: string | null;
}
export declare const CreateBankAccountSchema: z.ZodObject<{
    bankId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    branch: z.ZodOptional<z.ZodString>;
    accountNumber: z.ZodString;
    accountName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code?: string;
    name?: string;
    bankId?: string;
    branch?: string;
    accountNumber?: string;
    accountName?: string;
}, {
    code?: string;
    name?: string;
    bankId?: string;
    branch?: string;
    accountNumber?: string;
    accountName?: string;
}>;

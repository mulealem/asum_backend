import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class BankAccount {
    id: string;
    bankId: string;
    accountNumber: string;
    accountName: string;
    isEnabled: boolean;
    enabledById: string;
    enabledBy: User;
    disabledById: string;
    disabledBy: User;
    disabledDate: Date;
}
export declare const BankAccountParameterSchema: z.ZodObject<{
    bankIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    accountNumber: z.ZodOptional<z.ZodString>;
    accountName: z.ZodOptional<z.ZodString>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    enabledByIds?: string[];
    disabledByIds?: string[];
    accountNumber?: string;
    accountName?: string;
    bankIds?: string[];
}, {
    isEnabled?: boolean;
    enabledByIds?: string[];
    disabledByIds?: string[];
    accountNumber?: string;
    accountName?: string;
    bankIds?: string[];
}>;

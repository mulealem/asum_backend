import { ExpenseCategory } from '@prisma/client';
import { z } from 'zod';
export declare class Expense {
    id: string;
    category: ExpenseCategory;
    amount: number;
    description?: string;
    referenceNumber?: string;
    bankAccountId: string;
    isEnabled: boolean;
    enabledById: string;
    disabledById: string;
    disabledDate: Date;
}
export declare const ExpenseParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    categories: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<{
        PAYROLL: "PAYROLL";
        PURCHASE_FOR_SALE: "PURCHASE_FOR_SALE";
        PURCHASE_FOR_INTERNAL_USE: "PURCHASE_FOR_INTERNAL_USE";
        GENERAL_OPERATING: "GENERAL_OPERATING";
        RENT: "RENT";
        UTILITIES: "UTILITIES";
        TRANSPORT: "TRANSPORT";
        OFFICE_SUPPLIES: "OFFICE_SUPPLIES";
        MAINTENANCE: "MAINTENANCE";
        OTHER: "OTHER";
    }>, "many">>;
    bankAccountIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodDate>;
    enabledEndDate: z.ZodOptional<z.ZodDate>;
    disabledStartDate: z.ZodOptional<z.ZodDate>;
    disabledEndDate: z.ZodOptional<z.ZodDate>;
    minAmount: z.ZodOptional<z.ZodNumber>;
    maxAmount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: Date;
    enabledEndDate?: Date;
    disabledStartDate?: Date;
    disabledEndDate?: Date;
    categories?: ("PAYROLL" | "PURCHASE_FOR_SALE" | "PURCHASE_FOR_INTERNAL_USE" | "GENERAL_OPERATING" | "RENT" | "UTILITIES" | "TRANSPORT" | "OFFICE_SUPPLIES" | "MAINTENANCE" | "OTHER")[];
    bankAccountIds?: string[];
    minAmount?: number;
    maxAmount?: number;
}, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: Date;
    enabledEndDate?: Date;
    disabledStartDate?: Date;
    disabledEndDate?: Date;
    categories?: ("PAYROLL" | "PURCHASE_FOR_SALE" | "PURCHASE_FOR_INTERNAL_USE" | "GENERAL_OPERATING" | "RENT" | "UTILITIES" | "TRANSPORT" | "OFFICE_SUPPLIES" | "MAINTENANCE" | "OTHER")[];
    bankAccountIds?: string[];
    minAmount?: number;
    maxAmount?: number;
}>;

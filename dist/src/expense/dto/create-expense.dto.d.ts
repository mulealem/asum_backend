import { ExpenseCategory } from '@prisma/client';
import { z } from 'zod';
export declare class CreateExpenseDto {
    category: ExpenseCategory;
    amount: number;
    description?: string;
    referenceNumber?: string;
    bankAccountId: string;
    enabledById: string | null;
}
export declare const CreateExpenseSchema: z.ZodObject<{
    category: z.ZodNativeEnum<{
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
    }>;
    amount: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    referenceNumber: z.ZodOptional<z.ZodString>;
    bankAccountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description?: string;
    referenceNumber?: string;
    amount?: number;
    bankAccountId?: string;
    category?: "PAYROLL" | "PURCHASE_FOR_SALE" | "PURCHASE_FOR_INTERNAL_USE" | "GENERAL_OPERATING" | "RENT" | "UTILITIES" | "TRANSPORT" | "OFFICE_SUPPLIES" | "MAINTENANCE" | "OTHER";
}, {
    description?: string;
    referenceNumber?: string;
    amount?: number;
    bankAccountId?: string;
    category?: "PAYROLL" | "PURCHASE_FOR_SALE" | "PURCHASE_FOR_INTERNAL_USE" | "GENERAL_OPERATING" | "RENT" | "UTILITIES" | "TRANSPORT" | "OFFICE_SUPPLIES" | "MAINTENANCE" | "OTHER";
}>;

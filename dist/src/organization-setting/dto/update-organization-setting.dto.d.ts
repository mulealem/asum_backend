import { z } from 'zod';
export declare class UpdateOrganizationSettingDto {
    name?: string;
    address?: string;
    phone1?: string;
    phone2?: string;
    email?: string;
    logoUrl?: string;
    bgColor?: string;
    textColor?: string;
    updatedById?: string;
}
export declare const UpdateOrganizationSettingSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
    phone1: z.ZodOptional<z.ZodString>;
    phone2: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodString>;
    bgColor: z.ZodOptional<z.ZodString>;
    textColor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
    address?: string;
    phone1?: string;
    phone2?: string;
    logoUrl?: string;
    bgColor?: string;
    textColor?: string;
}, {
    name?: string;
    email?: string;
    address?: string;
    phone1?: string;
    phone2?: string;
    logoUrl?: string;
    bgColor?: string;
    textColor?: string;
}>;

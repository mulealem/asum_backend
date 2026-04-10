import { z } from 'zod';
export declare class CreateCustomerDto {
    name: string;
    phoneNumber: string;
    tin: string;
    address: string;
    enabledById: string | null;
}
export declare const CreateCustomerSchema: z.ZodObject<{
    name: z.ZodString;
    phoneNumber: z.ZodString;
    tin: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    phoneNumber?: string;
    tin?: string;
    address?: string;
}, {
    name?: string;
    phoneNumber?: string;
    tin?: string;
    address?: string;
}>;

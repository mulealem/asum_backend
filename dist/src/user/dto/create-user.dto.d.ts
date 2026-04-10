import { z } from 'zod';
export declare class CreateUserDto {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    enabledById: string | null;
    roleIds: string[];
}
export declare const CreateUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phoneNumber: z.ZodString;
    password: z.ZodString;
    roleIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    roleIds?: string[];
}, {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    roleIds?: string[];
}>;

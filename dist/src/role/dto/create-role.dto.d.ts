import { z } from 'zod';
export declare class CreateRoleDto {
    title: string;
    permissions: string;
    enabledById: string | null;
}
export declare const CreateRoleSchema: z.ZodObject<{
    title: z.ZodString;
    permissions: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    permissions?: string;
}, {
    title?: string;
    permissions?: string;
}>;

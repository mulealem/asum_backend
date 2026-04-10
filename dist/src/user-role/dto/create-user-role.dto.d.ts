import { z } from 'zod';
export declare class CreateUserRoleDto {
    userId: string;
    roleId: string;
    enabledById: string | null;
}
export declare const CreateUserRoleSchema: z.ZodObject<{
    userId: z.ZodString;
    roleId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roleId?: string;
    userId?: string;
}, {
    roleId?: string;
    userId?: string;
}>;

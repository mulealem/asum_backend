import { Role } from '../../role/entities/role.entity';
import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class UserRole {
    userId: string;
    user: User;
    roleId: string;
    role: Role;
    isEnabled: boolean;
    disabledById: string;
    disabledBy: User;
    disabledDate: Date;
    enabledById: string;
    enabledBy: User;
}
export declare const UserRoleParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    userIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    roleIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    roleIds?: string[];
    userIds?: string[];
}, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    roleIds?: string[];
    userIds?: string[];
}>;

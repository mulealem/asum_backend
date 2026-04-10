import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class Customer {
    name: string;
    phoneNumber: string;
    tin: string;
    address: string;
    isEnabled: boolean;
    enabledById: string;
    enabledBy: User;
    disabledById: string;
    disabledBy: User;
    disabledDate: Date;
}
export declare const CustomerParameterSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    name: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    tin: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    name?: string;
    search?: string;
    ids?: string[];
    phoneNumber?: string;
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    tin?: string;
    address?: string;
}, {
    isEnabled?: boolean;
    name?: string;
    search?: string;
    ids?: string[];
    phoneNumber?: string;
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    tin?: string;
    address?: string;
}>;

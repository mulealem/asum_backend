import { PrismaClient } from '@prisma/client';
export declare const ALL_ADMIN_PERMISSIONS: string[];
export declare function normalizePermissions(rawPermissions?: string): string;
export declare function seedAdmin(prismaClient?: PrismaClient): Promise<{
    adminRole: {
        title: string;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        permissions: string;
    };
    adminUser: {
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        name: string;
        email: string;
        phoneNumber: string | null;
        password: string;
    };
}>;

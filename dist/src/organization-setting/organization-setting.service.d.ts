import { UpdateOrganizationSettingDto } from './dto/update-organization-setting.dto';
import { PrismaService } from '../prisma.service';
export declare class OrganizationSettingService {
    private prisma;
    constructor(prisma: PrismaService);
    get(): Promise<{
        id: string;
        name: string;
        email: string | null;
        address: string | null;
        phone1: string | null;
        phone2: string | null;
        logoUrl: string | null;
        bgColor: string | null;
        textColor: string | null;
        updatedAt: Date;
        updatedById: string | null;
    }>;
    upsert(data: UpdateOrganizationSettingDto): Promise<{
        id: string;
        name: string;
        email: string | null;
        address: string | null;
        phone1: string | null;
        phone2: string | null;
        logoUrl: string | null;
        bgColor: string | null;
        textColor: string | null;
        updatedAt: Date;
        updatedById: string | null;
    }>;
}

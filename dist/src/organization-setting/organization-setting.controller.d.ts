import { OrganizationSettingService } from './organization-setting.service';
import { UpdateOrganizationSettingDto } from './dto/update-organization-setting.dto';
export declare class OrganizationSettingController {
    private readonly organizationSettingService;
    constructor(organizationSettingService: OrganizationSettingService);
    get(): Promise<{
        id: string;
        name: string;
        address: string | null;
        email: string | null;
        phone1: string | null;
        phone2: string | null;
        logoUrl: string | null;
        bgColor: string | null;
        textColor: string | null;
        updatedAt: Date;
        updatedById: string | null;
    }>;
    update(dto: UpdateOrganizationSettingDto, req: any): Promise<{
        id: string;
        name: string;
        address: string | null;
        email: string | null;
        phone1: string | null;
        phone2: string | null;
        logoUrl: string | null;
        bgColor: string | null;
        textColor: string | null;
        updatedAt: Date;
        updatedById: string | null;
    }>;
}

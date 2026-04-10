import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        title: string;
        abbreviation: string | null;
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        typeOfProduct: {
            title: string;
            abbreviation: string | null;
            description: string | null;
            enabledById: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
        };
    } & {
        title: string;
        abbreviation: string | null;
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
    })[]>;
    filter(query: any): import(".prisma/client").Prisma.PrismaPromise<({
        typeOfProduct: {
            title: string;
            abbreviation: string | null;
            description: string | null;
            enabledById: string | null;
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
        };
    } & {
        title: string;
        abbreviation: string | null;
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        title: string;
        abbreviation: string | null;
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateProductDto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        title: string;
        abbreviation: string | null;
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        title: string;
        abbreviation: string | null;
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, disabledById: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        title: string;
        abbreviation: string | null;
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        title: string;
        abbreviation: string | null;
        description: string | null;
        enabledById: string | null;
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

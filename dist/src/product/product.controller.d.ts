import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, req: any): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
        title: string;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        typeOfProduct: {
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            title: string;
            abbreviation: string | null;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
        title: string;
        abbreviation: string | null;
        description: string | null;
    })[]>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<({
        typeOfProduct: {
            id: string;
            createdAt: Date;
            isEnabled: boolean;
            enableRemark: string | null;
            enabledById: string | null;
            disableRemark: string | null;
            disabledById: string | null;
            disabledDate: Date | null;
            title: string;
            abbreviation: string | null;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
        title: string;
        abbreviation: string | null;
        description: string | null;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
        title: string;
        abbreviation: string | null;
        description: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateProductDto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
        title: string;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
        title: string;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    enable(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
        title: string;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    disable(id: string, req: any): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        isEnabled: boolean;
        enableRemark: string | null;
        enabledById: string | null;
        disableRemark: string | null;
        disabledById: string | null;
        disabledDate: Date | null;
        typeOfProductId: string;
        title: string;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

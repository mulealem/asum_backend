import { PrismaService } from '../prisma.service';
export declare class BookService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, data: any): Promise<any>;
    remove(id: number): Promise<any>;
}

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private readonly jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    validateUser(email: string, password: string): Promise<any>;
    hashPassword(password: string): Promise<string>;
    login(user: any): Promise<{
        accessToken: string;
    }>;
}

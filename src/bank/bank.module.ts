import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
// import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}

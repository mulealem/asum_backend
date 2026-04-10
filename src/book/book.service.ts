import { PrismaService } from '../prisma.service';
// import { Book } from '../dtos/book.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<any> {
    // return this.prisma.book.create({ data });
    return '';
  }

  async findAll(): Promise<any[]> {
    // return this.prisma.book.findMany({
    //   select: {
    //     id: true,
    //     title: true,
    //     author: true,
    //   },
    // });
    return [''];
  }

  async findOne(id: number): Promise<any> {
    // return this.prisma.book.findUnique({ where: { id } });
    return '';
  }

  async update(id: number, data: any): Promise<any> {
    // return this.prisma.book.update({ where: { id }, data });
    return '';
  }

  async remove(id: number): Promise<any> {
    // return this.prisma.book.delete({ where: { id } });
    return '';
  }
}

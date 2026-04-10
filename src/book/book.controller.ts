import {
  Post,
  Get,
  Put,
  Param,
  Body,
  Delete,
  Controller,
} from '@nestjs/common';
import { Book } from '../dtos/book.model';
import { BookService } from './book.service';

@Controller('api/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  create(@Body() data: Book) {
    return this.bookService.create(data);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Book) {
    return this.bookService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}

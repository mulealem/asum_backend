import { Book } from '../dtos/book.model';
import { BookService } from './book.service';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    create(data: Book): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, data: Book): Promise<any>;
    remove(id: string): Promise<any>;
}

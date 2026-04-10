import { Prisma } from '@prisma/client';

export class Book {
  title: string;
  author: string;
}

export class BookResponse {
  id: number;
  title: string;
  author: string;
}

export class BookUpdate {
  title?: string;
  author?: string;
}

export class BookCreate {
  title: string;
  author: string;
}

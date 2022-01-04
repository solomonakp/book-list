export interface Book {
  title: string;
  genre: string;
  authorId: string;
  author?: Author;
}

interface Author {
  age: number;
  name: string;
}

export interface GetBook {
  book: Book;
}

export interface GetBookData {
  id: string;
}

export type Books = Array<Book>;

export interface GetBooks {
  books: Books;
}

export interface Book {
  title: string;
  genre: string;
  authorId: string;
  author: Author;
  id: string;
}

interface Author {
  age: number;
  name: string;
  id: string;
  books: Books;
}

export interface GetBookData {
  book: Book;
}

export interface GetBookVar {
  bookId: BookId;
}

export type Books = Array<Book>;

export interface GetBooksData {
  books: Books;
}

export type Authors = Array<Author>;

export interface GetAuthorsData {
  authors: Authors;
}

export interface NewBookDetails {
  title: string;
  genre: string;
  authorId: string;
}

export type BookId = string | null;

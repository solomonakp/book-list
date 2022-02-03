export interface Book {
  title: string;
  genre: string;
  authorId: string;
  author: Author;
}

interface Author {
  age: number;
  name: string;
  id: string;
}

export interface GetBookData {
  book: Book;
}

export interface GetBookVar {
  bookId: string;
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

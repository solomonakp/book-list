export interface Book {
  title: string;
  genre: string;
  authorId: string;
}

export type Books = Array<Book>;

export interface GetBooks {
  books: Books;
}

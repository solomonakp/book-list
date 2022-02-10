import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      authorId
      genre
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

export const GET_BOOK = gql`
  query Book($bookId: ID!) {
    book(id: $bookId) {
      title
      genre
      author {
        name
        age
        books {
          title
          id
        }
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $genre: String!, $authorId: ID!) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      title
      genre
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      age
      name
    }
  }
`;

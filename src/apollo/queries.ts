import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query {
    books {
      title
      authorId
      genre
    }
  }
`;

export const GET_AUTHORS = gql`
  query {
    authors {
      id
      name
    }
  }
`;

export const GET_BOOK = gql`
  query ($bookId: ID!) {
    book(id: $bookId) {
      title
      genre
      author {
        name
        age
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation ($title: String!, $genre: String!, $authorId: ID!) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      title
      genre
    }
  }
`;

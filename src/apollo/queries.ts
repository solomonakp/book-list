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

export const GET_AUTHOR = gql`
  query {
    author {
      id
      name
    }
  }
`;

export const GET_BOOK = gql`
  query ($id: ID!) {
    book(id: $id) {
      title
      genre
      author {
        name
        age
      }
    }
  }
`;

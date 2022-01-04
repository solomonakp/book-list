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

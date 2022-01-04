import { useQuery } from '@apollo/client';
import React from 'react';
import { GetBooks } from 'types';
import { GET_BOOKS } from 'apollo/queries';

const BookList = () => {
  const { loading, error, data } = useQuery<GetBooks, null>(GET_BOOKS);

  if (loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul>
      {data?.books.map(({ title, genre }, index) => {
        return (
          <li key={index}>
            <span className='mr-5'>{title}</span>
            <span>{genre}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default BookList;

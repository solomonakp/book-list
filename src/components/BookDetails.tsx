import React from 'react';
import { useQuery } from '@apollo/client';
import { GetBook } from 'types';
import { GetBookData } from '../types';
import { GET_BOOK } from '../apollo/queries';

interface Props {
  authorId: string;
}

const BookDetails = (props: Props) => {
  const { authorId } = props;

  const { loading, data, error } = useQuery<GetBook, GetBookData>(GET_BOOK, {
    variables: { id: authorId },
  });

  if (loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='card'>
      <p>Book Details go here</p>

      <p>{data?.book.title}</p>
      <p>{data?.book.genre}</p>
      <p>{data?.book.author?.age}</p>
      <p>{data?.book.author?.name}</p>
    </div>
  );
};

export default BookDetails;

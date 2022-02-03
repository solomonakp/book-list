import React from 'react';
import { useQuery } from '@apollo/client';
import { GetBookData, GetBookVar } from 'types';

import { GET_BOOK } from 'apollo/queries';

interface Props {
  bookId: string;
}

const BookDetails = (props: Props) => {
  const { bookId } = props;

  const { loading, data, error } = useQuery<GetBookData, GetBookVar>(GET_BOOK, {
    variables: { bookId },
  });

  if (loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const {
    book: {
      title,
      genre,
      author: { age, name },
    },
  } = data!;
  return (
    <div className='card'>
      <p>Book Details go here</p>
      <p>{title}</p>
      <p>{genre}</p>
      <p>{age}</p>
      <p>{name}</p>
    </div>
  );
};

export default BookDetails;

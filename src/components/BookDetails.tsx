import React, { memo } from 'react';
import { useQuery } from '@apollo/client';
import { GetBookData, GetBookVar, BookId } from 'types';
import { GET_BOOK } from 'apollo/queries';
import { filterBooksByTitle } from 'utils/functions';
import Loader from 'components/Loader';
import useNotification from 'hooks/useNotification';

interface Props {
  bookId: BookId;
}

const BookDetails = (props: Props) => {
  const { bookId } = props;

  const { loading, data, error } = useQuery<GetBookData, GetBookVar>(GET_BOOK, {
    variables: { bookId },
    skip: !bookId,
  });

  useNotification(error, undefined, undefined);

  if (loading) {
    return <Loader />;
  }

  if (data) {
    const {
      book: {
        title,
        genre,
        author: { books, name },
      },
    } = data;

    const filterBooks = books ?? filterBooksByTitle(books, title);

    return (
      <div className='book-details '>
        <h2 className='mb-8 font-semibold text-2xl mt-14'>{title}</h2>
        <p className='book-detail'>Genre: {genre}</p>
        <p className='book-detail'>Author: {name}</p>
        {Boolean(filterBooks.length) && (
          <>
            {' '}
            <p className='mb-2 text-lg'>Other books by this Author:</p>
            <ul>
              {filterBooks.map(({ title, id }) => {
                return (
                  <li key={id} className='mb-2'>
                    {title}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    );
  }

  return (
    <div className='book-details flex justify-center items-center'>
      <p>Click on a book to show its details here</p>
    </div>
  );
};

export default memo(BookDetails);

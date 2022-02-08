import { useQuery } from '@apollo/client';
import React, { useState, useCallback } from 'react';
import { GetBooksData, BookId } from 'types';
import { GET_BOOKS } from 'apollo/queries';
import BookDetails from 'components/BookDetails';
import BookList from 'components/BooksLIst';
import Loader from 'components/Loader';

const Books = () => {
  const { loading, error, data } = useQuery<GetBooksData, null>(GET_BOOKS);

  const [bookId, setBookId] = useState<BookId>(null);

  const delegateSelectedBook = useCallback<(id: BookId) => void>(
    (id) => {
      const selectedId =
        bookId === id ? null : bookId === null || bookId !== id ? id : id;

      setBookId(selectedId);
    },
    [bookId]
  );

  if (loading) {
    return <Loader fixed />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <BookList
        books={data?.books}
        clickAction={delegateSelectedBook}
        selectedBook={bookId}
      />
      <div className='bg-fogra text-white row-span-1 lg:row-span-2 drop-shadow-2xl'>
        <BookDetails bookId={bookId} />
      </div>
    </>
  );
};

export default Books;

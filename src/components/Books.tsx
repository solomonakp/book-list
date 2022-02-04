import { useQuery } from '@apollo/client';
import React, { useState, useCallback } from 'react';
import { GetBooksData, BookId } from 'types';
import { GET_BOOKS } from 'apollo/queries';
import BookDetails from 'components/BookDetails';
import BookList from 'components/BooksLIst';

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
    return <div>...loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div id='books' className='grid lg:grid-cols-3 grid-col-1'>
      <BookList
        books={data?.books}
        clickAction={delegateSelectedBook}
        selectedBook={bookId}
      />
      <BookDetails bookId={bookId} />
    </div>
  );
};

export default Books;

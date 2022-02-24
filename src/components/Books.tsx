import { useState, useCallback, FC } from 'react';
import { BookId, Books as BooksType } from 'types';

import BookDetails from 'components/BookDetails';
import BookList from 'components/BooksLIst';

interface BookProps {
  books: BooksType | undefined;
}

const Books: FC<BookProps> = (props) => {
  const { books } = props;

  const [bookId, setBookId] = useState<BookId>(null);

  const delegateSelectedBook = useCallback<(id: BookId) => void>(
    (id) => {
      const selectedId =
        bookId === id ? null : bookId === null || bookId !== id ? id : id;

      setBookId(selectedId);
    },
    [bookId]
  );

  return (
    <>
      <BookList
        books={books}
        clickAction={delegateSelectedBook}
        selectedBook={bookId}
      />
      <div className='bg-fogra text-white row-span-1 lg:row-span-2 drop-shadow-2xl min-h-[26rem]'>
        <BookDetails bookId={bookId} />
      </div>
    </>
  );
};

export default Books;

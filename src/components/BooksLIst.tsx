import React, { FC, memo } from 'react';
import { BookId, Books } from 'types';
import SimpleBar from 'simplebar-react';

interface BookListProps {
  books: Books | undefined;
  clickAction: (id: BookId) => void;
  selectedBook: BookId;
}

const BookList: FC<BookListProps> = ({ books, clickAction, selectedBook }) => {
  return (
    <div className='p-4 col-span-1 lg:col-span-2'>
      <h1 className='mb-10 font-semibold text-5xl text-sky-900'>
        My Book List
      </h1>
      <SimpleBar forceVisible='y' autoHide={false} className='max-h-[25.5rem]'>
        <ul id='book-list'>
          {books?.map(({ title, id }) => {
            return (
              <li
                key={id}
                className={`p-4 inline-block border-sky-400 hover:border-blue-600 hover:text-blue-800 border-2 mr-4 rounded mb-4 cursor-pointer whitespace-nowrap text-sky-700 drop-shadow-2xl transition ease-in-out ${
                  selectedBook === id ? 'border-red-500 text-red-700' : ''
                }`}
                onClick={() => clickAction(id)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      </SimpleBar>
    </div>
  );
};

export default memo(BookList);

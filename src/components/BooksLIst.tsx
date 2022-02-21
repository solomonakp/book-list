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
      <h1 className='mb-6 font-semibold text-5xl text-prussian'>
        My Book List
      </h1>
      <SimpleBar
        forceVisible='y'
        autoHide={false}
        className='max-h-[15rem] 2xl:max-h-[25.5rem]'
      >
        <ul id='book-list'>
          {books?.map(({ title, id }) => {
            return (
              <li
                key={id}
                className={`p-4 inline-block border-crayola hover:border-blue-600 hover:text-blue-800 border-2 mr-4 rounded mb-4 cursor-pointer whitespace-nowrap text-sky-700 drop-shadow-2xl transition ease-in-out ${
                  selectedBook === id ? 'border-red-500 text-red-700' : ''
                }`}
                data-testid='book-item'
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

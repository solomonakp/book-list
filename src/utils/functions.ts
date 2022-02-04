import { Authors, Books } from 'types';

export const createOptions = (authors: Authors) => {
  const options = authors.map(({ name, id }) => {
    return { label: name, value: id };
  });

  return options;
};

export const filterBooksByTitle = (books: Books, currentBookTitle: string) => {
  const filteredBooksByTitle = books.filter(({ title }) => {
    return title !== currentBookTitle;
  });

  return filteredBooksByTitle;
};

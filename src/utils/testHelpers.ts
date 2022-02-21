import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { Book } from 'types';
import { Author } from '../types';

export const BuildBook = build<Book>('Book', {
  fields: {
    title: fake((f) => f.lorem.words(3)),
    author: {
      name: fake((f) => `${f.name.firstName()} ${f.name.lastName()}`),
    },
    genre: fake((f) => f.lorem.word()),
    id: sequence(),
    authorId: sequence(),
  },
});

export const BuildAuthor = build<Author>('Author', {
  fields: {
    id: sequence(),
    age: fake((f) => f.datatype.number(100)),
    name: fake((f) => `${f.name.firstName()} ${f.name.lastName()}`),
    books: [],
  },
});

import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { Book } from 'types';
import { Author } from '../types';

export const BuildBook = build<Book>('Book', {
  fields: {
    title: fake((f) => f.lorem.words(3)),
    author: {
      name: fake((f) => `${f.name.firstName()} ${f.name.lastName()}`),
      age: fake(
        (f) =>
          `${f.datatype.number({
            min: 15,
            max: 130,
          })}`
      ),
      books: [],
    },
    genre: fake((f) => f.lorem.word()),
    id: sequence((x) => `00${x}4481`),
    authorId: sequence((x) => `00${x}7635`),
  },
});

export const BuildAuthor = build<Author>('Author', {
  fields: {
    id: sequence((x) => `00${x}437`),
    age: fake((f) =>
      f.datatype.number({
        min: 15,
        max: 130,
      })
    ),
    name: fake((f) => `${f.name.firstName()} ${f.name.lastName()}`),
    books: [],
  },
});

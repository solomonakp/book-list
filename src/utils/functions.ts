import { Authors } from 'types';

export const createOptions = (authors: Authors) => {
  const options = authors.map(({ name, id }) => {
    return { label: name, value: id };
  });

  return options;
};

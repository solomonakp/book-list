import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

// components
import Button from 'components/Button';
import Input from 'components/Input';
import Select, { Option } from 'components/Select';

import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from 'apollo/queries';
import { Book, GetAuthorsData } from 'types';
import { createOptions } from 'utils/functions';
import { NewBookDetails } from 'types';

interface Inputs {
  title: string;
  genre: string;
  author: string;
}

const schema = yup
  .object({
    title: yup.string().required('Please enter a title'),
    genre: yup
      .string()
      .min(2, 'Please enter a valid Genre')
      .required('Genre is Required'),
    author: yup.string().required('Please select an Author'),
  })
  .required();

const AddBook = () => {
  const [options, setOptions] = useState<Array<Option>>([
    { label: 'Loading', value: 'none' },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { author, genre, title } = watch();

  const { data, loading } = useQuery<GetAuthorsData>(GET_AUTHORS);

  const [addedBook] = useMutation<{ addBooks: Book }, NewBookDetails>(
    ADD_BOOK,
    {
      variables: {
        genre,
        title,
        authorId: author,
      },
      refetchQueries: [GET_BOOKS, 'getBooks'],
    }
  );

  // update select with authors from backend
  useEffect(() => {
    if (data) {
      setOptions(createOptions(data.authors));
    }
  }, [loading, data]);

  const onSubmit: SubmitHandler<Inputs> = (data) => addedBook();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Title'
        error={errors.title?.message}
        {...register('title', { required: true })}
      />
      <Input
        label='Genre'
        error={errors.genre?.message}
        {...register('genre', { required: true })}
      />
      <Select
        label='Author'
        error={errors.author?.message}
        {...register('author', { required: true })}
        options={options}
        disabled={loading}
      />
      <Button>Add Book</Button>
    </form>
  );
};

export default AddBook;

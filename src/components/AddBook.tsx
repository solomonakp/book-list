import { useForm, SubmitHandler } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

// components
import Button from 'components/Button';
import Input from 'components/Input';
import Select, { Option } from 'components/Select';

// queries , types utils
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from 'apollo/queries';
import { Book, GetAuthorsData } from 'types';
import { createOptions } from 'utils/functions';
import { NewBookDetails } from 'types';

// custom hooks
import useNotification from 'hooks/useNotification';

interface Inputs {
  title: string;
  genre: string;
  author: string;
}

const schema = object({
  title: string().required('Please enter a title'),
  genre: string()
    .min(2, 'Please enter a valid Genre')
    .required('Genre is Required'),
  author: string().required('Please select an Author'),
}).required();

const AddBook = () => {
  const [options, setOptions] = useState<Array<Option>>([
    { label: 'Select Author ', value: '' },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid, isSubmitSuccessful },
    watch,
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { author, genre, title } = watch();

  const { data, loading } = useQuery<GetAuthorsData>(GET_AUTHORS, {});

  const [addBook, { error, data: addData }] = useMutation<
    { addBooks: Book },
    NewBookDetails
  >(ADD_BOOK, {
    variables: {
      genre,
      title,
      authorId: author,
    },
    refetchQueries: [GET_BOOKS, 'GetBooks'],
  });

  useEffect(() => {
    console.log(addData, 'add function');
  }, [addData]);

  useNotification(
    error,
    isSubmitSuccessful,
    'Book has been successfully added'
  );

  // update select with authors from backend
  useEffect(() => {
    if (data) {
      setOptions((options) => [...options, ...createOptions(data.authors)]);
    }
  }, [loading, data]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => await addBook();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className='min-h-[350.33px]'>
      <h3 className='font-medium leading-tight text-3xl text-prussian'>
        Add a Book
      </h3>
      <div className='max-w-xs mt-3'>
        <Input
          label='Title'
          error={errors.title?.message}
          {...register('title')}
          type='text'
        />
        <Input
          label='Genre'
          error={errors.genre?.message}
          {...register('genre')}
          type='text'
        />
        <Select
          label='Author'
          error={errors.author?.message}
          {...register('author')}
          options={options}
          disabled={loading}
        />
        <Button
          className='mt-2'
          role='button'
          type='submit'
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddBook;

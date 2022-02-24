import { string, object } from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

// components
import Button from 'components/Button';
import Input from 'components/Input';

// types and queries
import { NewAuthorDetails, Author } from 'types';
import { ADD_AUTHOR } from 'apollo/queries';
import { GET_AUTHORS } from 'apollo/queries';

// custom hooks
import useNotification from 'hooks/useNotification';

interface Inputs {
  name: string;
  age: number;
}

const schema = object({
  name: string().required('Please enter a title'),
  age: string().required('Please enter a number'),
}).required();

const AddAuthor = () => {
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

  const { name, age } = watch();

  const [addAuthor, { error }] = useMutation<
    { addAuthor: Author },
    NewAuthorDetails
  >(ADD_AUTHOR, {
    variables: {
      name,
      age: Number(age),
    },
    refetchQueries: [GET_AUTHORS, 'GetAuthors'],
    awaitRefetchQueries: true,
  });

  // notification hook
  useNotification(
    error,
    isSubmitSuccessful,
    'Author has been successfully added'
  );

  // resets after submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<Inputs> = async () => await addAuthor();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='min-h-[350.33px]'>
      <h3 className='font-medium leading-tight text-3xl text-prussian'>
        Add a Author
      </h3>

      <div className='max-w-xs mt-3'>
        <Input
          label='Name'
          error={errors.name?.message}
          {...register('name', { required: true })}
          type='text'
        />
        <Input
          type='number'
          label='Age'
          error={errors.age?.message}
          {...register('age', {
            required: true,
            pattern: { value: /^[0-9]+$/, message: 'Please Enter a number' },
          })}
        />
        <Button
          className='mt-2'
          disabled={!isDirty || !isValid || isSubmitting}
          role='button'
          type='submit'
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddAuthor;

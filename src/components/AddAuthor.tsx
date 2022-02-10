import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

// components
import Button from 'components/Button';
import Input from 'components/Input';

// types and queries
import { NewAuthorDetails, Author } from 'types';
import { ADD_AUTHOR } from 'apollo/queries';
import { GET_AUTHORS } from '../apollo/queries';

interface Inputs {
  name: string;
  age: number;
}

const schema = yup
  .object({
    name: yup.string().required('Please enter a title'),
    age: yup.string().required('Please enter a number'),
  })
  .required();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const AddAuthor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { name, age } = watch();

  const [addAuthor] = useMutation<{ addAuthor: Author }, NewAuthorDetails>(
    ADD_AUTHOR,
    {
      variables: {
        name,
        age: Number(age),
      },
      refetchQueries: [GET_AUTHORS, 'getAuthors'],
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => await sleep(5000);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className='min-h-[350.33px]'>
      <h3 className='font-medium leading-tight text-3xl text-prussian'>
        Add a Author
      </h3>

      <div className='max-w-xs mt-3'>
        <Input
          label='Title'
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

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import Button from 'components/Button';
import Input from 'components/Input';

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

const AddAuthor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className='lg:min-h-[350.33px]'>
      <h3 className='font-medium leading-tight text-3xl'>Add a Author</h3>

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
        <Button className='mt-2'>Add</Button>
      </div>
    </form>
  );
};

export default AddAuthor;

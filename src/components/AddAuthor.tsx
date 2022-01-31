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
    age: yup.number().positive().integer().required(),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Title'
        error={errors.name?.message}
        {...register('name', { required: true })}
      />
      <Input
        type='number'
        label='Age'
        error={errors.age?.message}
        {...register('age', { required: true })}
      />
      <Button>Add Book</Button>
    </form>
  );
};

export default AddAuthor;

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import Button from './Button';
import Input from './Input';
import Select from './Select';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(errors);
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
        options={[{ label: 'choose an author', value: '001' }]}
      />
      <Button>Add Book</Button>
    </form>
  );
};

export default AddBook;

import { useState } from 'react';
import AddBook from 'components/AddBook';
import AddAuthor from 'components/AddAuthor';
import Button from './Button';

type AddBookType = 'add-book';
type AddAuthorType = 'add-author';

const AddEntity = () => {
  const [entity, setEntity] = useState<AddBookType | AddAuthorType>('add-book');

  const toggleForm = () => {
    if (entity === 'add-book') {
      setEntity('add-author');
    } else {
      setEntity('add-book');
    }
  };

  return (
    <div className='p-4 flex items-baseline col-span-1 lg:col-span-2'>
      {entity === 'add-book' ? <AddBook /> : <AddAuthor />}
      <Button onClick={toggleForm} className='ml-8'>
        Add {entity === 'add-author' ? 'Book' : 'Author'}
      </Button>
    </div>
  );
};

export default AddEntity;

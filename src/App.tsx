import Books from 'components/Books';
import { useQuery } from '@apollo/client';
import AddEntity from 'components/AddEntity';
import { GET_BOOKS } from 'apollo/queries';
import { GetBooksData } from 'types';
import { ReactNotifications } from 'react-notifications-component';
import Loader from 'components/Loader';
import 'simplebar/dist/simplebar.min.css';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

function App() {
  const { loading, error, data } = useQuery<GetBooksData, null>(GET_BOOKS);

  if (loading) {
    return <Loader fixed />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const books = data?.books;
  return (
    <div className='App grid lg:grid-cols-3 grid-col-1 min-h-screen bg-white'>
      <ReactNotifications />
      <Books books={books} />
      <AddEntity />
    </div>
  );
}

export default App;

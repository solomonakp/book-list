import AddBook from 'components/AddBook';
import BookDetails from 'components/BookDetails';
import BookList from 'components/BooksLIst';
import React from 'react';

function App() {
  return (
    <div className='App'>
      <BookList />
      <AddBook />
      <BookDetails authorId='61c2d71fe21794293f4bd365' />
    </div>
  );
}

export default App;

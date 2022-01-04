import AddBook from 'components/AddBook';
import BookList from 'components/BooksLIst';
import React from 'react';

function App() {
  return (
    <div className='App'>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;

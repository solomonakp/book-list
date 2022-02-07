import Books from 'components/Books';
import React from 'react';
import AddEntity from 'components/AddEntity';
import 'simplebar/dist/simplebar.min.css';

function App() {
  return (
    <div className='App grid lg:grid-cols-3 grid-col-1 min-h-screen'>
      <Books />
      <AddEntity />
    </div>
  );
}

export default App;

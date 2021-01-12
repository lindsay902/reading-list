import React, {useState, useEffect} from 'react';
import './style.css';

function App() {
  const [books, setBooks] = useState(false);
  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    fetch('http://localhost:3001/')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setBooks(data);
      });
  }

  function createBook() {
    let title = prompt('Enter book title');
    let author = prompt('Enter author name');
    fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, author}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getBooks();
      });
  }

  function deleteBook() {
    let id = prompt('Enter book id');
    fetch(`http://localhost:3001/books/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text({id});
      })
      .then(data => {
        alert(data);
        getBooks();
      });
  }

  return (
    <div className="main">
      <h1 className="header">
        My Reading List
      </h1>
      {books ? books : 'There is no book data available'}
      <br />
      <button onClick={createBook}>Add book</button>
      <br />
      <button onClick={deleteBook}>Delete book</button>
    </div>
  );
}
export default App;

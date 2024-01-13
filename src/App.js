// importaciones //
import React, { useState, useEffect } from 'react';
import BooksList from './components/BooksList';
import BookDetails from './components/BooksDetails';
import AddBook from './components/AddBook';

function App() {
  
  const [books, setBooks] = useState([]);

  // Llamada fetch a URL de API_REST para traer todos los libros
  useEffect(() => {
    const fetchBooks = () => {
      fetch('http://localhost:3000/books')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Error al obtener la lista de libros');
          }
        })
        .then(data => {
          setBooks(data);
        })
        .catch(error => {
          console.error('Error en la llamada a la API:', error);
        });
    };

    fetchBooks();
  }, []);

  
  // funcion para añadir libro
  function handleAddBook(addedBook) {
    setBooks([...books, addedBook]);
  }

  return (
    // Mostramos en pantalla Lista de libros BooksList
    // Mostramos AddBook con un formulario
    <div>
      <h1>Librería</h1>
      <BooksList books={books}  />
      <AddBook onAddBook={handleAddBook} />
    </div>
  );
}

export default App;

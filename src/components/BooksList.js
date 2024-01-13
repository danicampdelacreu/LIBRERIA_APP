import React, { useState, useEffect } from 'react';
import BookDetails from './BooksDetails';
import EditBook from './EditBook';

// Creamos componente BooksList
const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  // Funcion con metodo GET (fetchBooks) para mostrar la lista de libros de BBDD
  const fetchBooks = () => {
    fetch('http://localhost:3000/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de libros');
        }
        return response.json();
      })
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error:', error.message));
  };

  // Funcion con metodo DELETE (handleDeleteBook) para eliminar de nuestra BBDD
  const handleDeleteBook = (bookId) => {
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el libro');
        }
        // Actualizamos la lista de libros excluyendo el libro eliminado
        setBooks(books.filter((book) => book.id !== bookId));
        setSelectedBook(null);
      })
      .catch((error) => console.error('Error:', error.message));
  };

  // Funciones para Ver y Editar
  const handleViewBook = (book) => {
    setSelectedBook(book);
    setIsViewing(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsEditing(true);
  };

  // Funcion con metodo PUT (handleSaveEdit) para editar nuestra BBDD
  const handleSaveEdit = (editedBook) => {
    fetch(`http://localhost:3000/books/${editedBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al guardar los cambios');
        }
        setIsEditing(false);
        fetchBooks();
      })
      .catch((error) => console.error('Error:', error.message));
  };

  // Effect para obtener la lista al montar el componente
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Libros</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li
            key={book.id}
            className="list-group-item"
          >
            <strong>Titulo: </strong>{book.Nombre}
            <button onClick={() => handleViewBook(book)}>Resumen</button> 
            <button onClick={() => handleEditBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isEditing ? (
        <EditBook book={selectedBook} onSave={handleSaveEdit} />
      ) : (
        <BookDetails book={selectedBook} />
      )}
    </div>
  );
};

export default BooksList;


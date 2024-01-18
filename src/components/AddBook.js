// importaciones //
import React, { useState } from 'react';

// creamos componente AddBook recibiendo funcion onAddBook como propiedad
const AddBook = ({ onAddBook }) => {

  // Crear estado newBook con dos propiedades que tenemos en BBDD  
  const [newBook, setNewBook] = useState({
    Nombre: '',
    Resumen: '',
  });

  // Definimos funcion handleImputChange que se ejecutar al modificar contendido y actualizamos newBook
  const handleInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  // Funcion con metodo POST (handleAddBook) para agregar el nuevo libro a BBDD
  const handleAddBook = () => {
    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => {
        if (response.ok) {
          // Llamamos a la función proporcionada por el padre para actualizar el estado
          onAddBook(newBook);

          // Limpiamos el formulario después de agregar el libro
          setNewBook({
            Nombre: '',
            Resumen: '',
          });
          // Recargamos la página
          window.location.reload();

        } else {
          console.error('Error al agregar el libro:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };

  return (
    <div>
      <h2>Añadir Libro</h2>
      <form>
        <label>
          Título:
          <input type="text" name="Nombre" value={newBook.Nombre} onChange={handleInputChange} />
        </label>
        <label>
          Resumen:
          <textarea name="Resumen" value={newBook.Resumen} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddBook}>
          Añadir Libro
        </button>
      </form>
    </div>
  );
};

export default AddBook;



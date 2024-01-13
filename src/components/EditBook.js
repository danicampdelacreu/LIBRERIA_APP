// importaciones //
import React, { useState } from 'react';

// Creacion componente EditBook con propiedades: book (libro que editar) y onSave (funcion guardar cambios)
const EditBook = ({ book, onSave }) => {
  // estado editeBook iniciamos con valor de libro que queremos editar
  const [editedBook, setEditedBook] = useState(book);

  // Funcion para cambio de contenido
  const handleInputChange = (e) => {
    setEditedBook({
      ...editedBook,
      [e.target.name]: e.target.value,
    });
  };
  // llamamos a onSave que pasa el libro editado como argumento
  const handleSave = () => {
    onSave(editedBook);
  };

  return (
    <div>
      <h2>Editar Libro</h2>
      <form>
        <label>
          Título:
          <input
            type="text"
            name="Nombre"
            value={editedBook.Nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Resumen:
          <textarea
            name="Resumen"
            value={editedBook.Resumen}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditBook;

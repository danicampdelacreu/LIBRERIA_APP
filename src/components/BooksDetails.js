// impotaciones
import React from 'react';

//  Funcion toma objeto book 
const BookDetails = ({ book }) => {
  if (!book) {
    return <p>Selecciona un libro para ver los detalles.</p>;
  }

  return (
    <div>
      <h2>{book.Nombre}</h2>
      <p>Resumen: {book.Resumen}</p>
    </div>
  );
};

export default BookDetails;

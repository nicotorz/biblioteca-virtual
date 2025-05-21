const Libro = require('../models/Libro.js');

const obtenerDatosLibro = async (titulo) =>  {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`;
    
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`HTTP error! status: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    
    if (!datos.docs || datos.docs.length === 0) {
        throw new Error('Libro no encontrado');
    }

    const libro = datos.docs[0];

    const tituloLimpio = libro.title || 'Titulo desconocido';
    const autor = libro.author_name?.[0] || 'Autor desconocido';
    const key = libro.key || 'ISBN no disponible';
    const año = libro.first_publish_year || 'Año de publicacion desconocido'

    return new Libro(tituloLimpio, autor, key, año);
};

module.exports = {
    obtenerDatosLibro,
};
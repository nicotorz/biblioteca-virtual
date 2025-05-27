const Libro = require('../models/Libro.js');

const obtenerDatosLibro = async (titulo) =>  {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`;
    
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`HTTP error status: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    
    if (!datos.docs || datos.docs.length === 0) {
        throw new Error('Libro no encontrado');
    }

    const libro = datos.docs[0];

    const tituloLimpio = libro.title || 'Titulo desconocido';
    const autor = libro.author_name?.[0] || 'Autor desconocido';
    const key = libro.key || 'Key no disponible';
    const año = libro.first_publish_year || 'Desconocido'

    return new Libro(tituloLimpio, autor, key, año);
};

const listarResultadosLibro = async (titulo) => {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error (`HTTP error! status: ${respuesta.status}`);
    }
    

    const datos = await respuesta.json();

    if (datos.docs.length === 0) {
        return [];
    }
    
    const libros = datos.docs.map(book => {
        const tituloLimpio = book.title || 'Titulo desconocido';
        const autor = book.author_name?.[0] || 'Autor desconocido';
        const key = book.key || 'Key no disponible';
        const año = book.first_publish_year || 'Desconocido';

        const libroLimpio = new Libro(tituloLimpio, autor, key, año);
        return libroLimpio
    });
    return libros;
}

module.exports = {
    obtenerDatosLibro,
    listarResultadosLibro
};
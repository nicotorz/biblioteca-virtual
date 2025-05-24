const { obtenerDatosLibro, listarResultadosLibro } = require('../services/openLibraryService.js');

const buscarLibro = async (req, res) => {
    const titulo = req.query.titulo;
    
    if (!titulo) {
        return res.status(400).json({ error: 'Falta el parametro "titulo"'});
    }

    try {
        const libro = await obtenerDatosLibro(titulo);
        res.json(libro);
    } catch (error) {
        console.error("Error real:", error);
        res.status(500).json({ error: "Error al buscar el libro"});
    }
};

const listarLibros = async (req, res) => {
    const titulo = req.query.titulo;

    if (!titulo) {
        return res.status(400).json({ error: 'Falta el parametro "titulo"' });
    }

    try {
        const resultados = await listarResultadosLibro(titulo);
        res.json(resultados);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al listar libros' });
    }
};

var favoritos = [];

const agregarFavorito = (req, res) => {
    const libro = req.body;

    if (favoritos.find(l => l.key === libro.key)) {
        return res.status(409).json({ error: 'Libro ya en favoritos' });
    }
    
    favoritos.push(libro);
    res.status(201).json({ mensaje: 'Agregado a favoritos' });
}

const listarFavoritos = (req, res) => {
    const desde = parseInt(req.query.desde);
    let resultado = favoritos;

    if (!isNaN(desde)) {
       resultado = favoritos.filter(libro =>
            !isNaN(libro.añoDePublicacion) && libro.añoDePublicacion >= desde
       );
    }

    res.json(resultado);
}

const eliminarFavorito = (req, res) => {
    const { key } = req.params;
    const index = favoritos.findIndex(libro => libro.key === `/works/${key}`);

    if (index === -1) {
        return res.status(404).json({ error: 'Libro no encontrado en favoritos' });
    }

    favoritos.splice(index, 1);
    res.json({ mensaje: 'Libro eliminado de favoritos' });
};


module.exports = {
    buscarLibro,
    listarLibros,
    agregarFavorito,
    listarFavoritos,
    eliminarFavorito
};
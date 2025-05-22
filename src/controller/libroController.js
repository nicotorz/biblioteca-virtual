const { obtenerDatosLibro } = require('../services/openLibraryService.js');
const { listarResultadosLibro } = require('../services/openLibraryService.js');

const buscarLibro = async (req, res) => {
    const titulo = req.query.titulo;
    
    if (!titulo) {
        return res.status(400).json({ error: 'Falta el parametro "titulo"'});
    }

    try {
        const libro = await obtenerDatosLibro(titulo);
        res.json(libro);
    } catch (error) {
        console.error('Error real:', error);
        res.status(500).json({ error: 'Error al buscar el libro'})
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

module.exports = {
    buscarLibro,
    listarLibros
};
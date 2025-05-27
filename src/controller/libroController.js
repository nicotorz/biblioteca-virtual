const { obtenerDatosLibro, listarResultadosLibro } = require('../services/openLibraryService');
const { leerFavoritos, guardarFavoritos } = require('../services/favoritosService')
const Joi = require('joi');

const esquemaLibro = Joi.object({
  titulo: Joi.string().required(),
  autor: Joi.string().required(),
  key: Joi.string().required(),
  añoDePublicacion: Joi.number().required(),
  categoria: Joi.string().required()
});

const buscarLibro = async (req, res) => {
    const titulo = req.query.titulo;
    
    if (!titulo) {
        return res.status(400).json({ error: 'Falta el parametro "titulo"'});
    }

    try {
        const libro = await obtenerDatosLibro(titulo);
        res.json(libro);
    } catch (error) {
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
        res.status(500).json({ error: 'Error al listar libros' });
    }
};

const agregarFavorito = (req, res) => {
  const libro = req.body;
  const favoritos = leerFavoritos();

  if (favoritos.find(l => l.key === libro.key)) {
    return res.status(409).json({ error: 'Libro ya en favoritos' });
  }

  favoritos.push(libro);
  guardarFavoritos(favoritos);

  res.status(201).json({ mensaje: 'Agregado a favoritos' });
};

const listarFavoritos = (req, res) => {
    const desde = parseInt(req.query.desde);
    const favoritos = leerFavoritos();

    let resultado = favoritos;
    if (!isNaN(desde)) {
        resultado = favoritos.filter(libro =>
            !isNaN(libro.añoDePublicacion) && libro.añoDePublicacion >= desde
        );
    }

    return res.json(resultado);
};


const eliminarFavorito = (req, res) => {
    const { key } = req.params;
    const favoritos = leerFavoritos();

    const index = favoritos.findIndex(libro => libro.key === `/works/${key}`);
    if (index === -1) {
        return res.status(404).json({ error: 'Libro no encontrado en favoritos' });
    }

    favoritos.splice(index, 1);
    guardarFavoritos(favoritos);
    res.json({ mensaje: 'Libro eliminado de favoritos' });
};


module.exports = {
    buscarLibro,
    listarLibros,
    agregarFavorito,
    listarFavoritos,
    eliminarFavorito
};
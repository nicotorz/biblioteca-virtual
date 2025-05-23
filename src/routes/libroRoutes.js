const express = require('express');
const router = express.Router();
const { buscarLibro, listarLibros, listarFavoritos, agregarFavorito, eliminarFavorito } = require('../controller/libroController.js');

router.get('/buscar', buscarLibro);
router.get('/listar', listarLibros);
router.get('/favoritos', listarFavoritos);
router.post('/agregar', agregarFavorito);
router.delete('/favoritos/:key', eliminarFavorito);


module.exports = router;
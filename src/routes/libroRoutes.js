const express = require('express');
const router = express.Router();
const { buscarLibro, listarLibros, listarFavoritos, agregarFavorito } = require('../controller/libroController.js');

router.get('/buscar', buscarLibro);
router.get('/listar', listarLibros);
router.get('/favoritos', listarFavoritos);
router.post('/agregar', agregarFavorito);

module.exports = router;
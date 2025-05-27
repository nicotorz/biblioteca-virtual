const express = require('express');
const router = express.Router();
const api = require('../controller/libroController.js');
const validarLibro = require('../middlewares/validarLibro.js');

router.get('/buscar', api.buscarLibro);
router.get('/listar', api.listarLibros);
router.get('/favoritos', api.listarFavoritos);
router.post('/favoritos', validarLibro, api.agregarFavorito);
router.delete('/favoritos/:key', api.eliminarFavorito);


module.exports = router;
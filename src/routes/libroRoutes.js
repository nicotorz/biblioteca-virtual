const express = require('express');
const router = express.Router();
const { buscarLibro, listarLibros } = require('../controller/libroController.js');

router.get('/buscar', buscarLibro);
router.get('/listar', listarLibros);

module.exports = router;
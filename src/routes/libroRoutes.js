const express = require('express');
const router = express.Router();
const { buscarLibro } = require('../controller/libroController.js');

router.get('/', buscarLibro);

module.exports = router;
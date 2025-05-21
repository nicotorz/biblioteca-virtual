const express = require('express');
const path = require('path');
const libroRoutes = require('./routes/libroRoutes.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/libros', libroRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
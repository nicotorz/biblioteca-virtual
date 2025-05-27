const express = require('express');
const path = require('path');
const libroRoutes = require('./routes/libroRoutes.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/libros', libroRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/error.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;

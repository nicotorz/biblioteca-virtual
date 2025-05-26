const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/favoritos.json');

function leerFavoritos() {
    try {
        const data = fs.readFileSync(rutaArchivo, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer favoritos:', error);
        return [];
    }
}

function guardarFavoritos(favoritos) {
    try {
        fs.writeFileSync(rutaArchivo, JSON.stringify(favoritos, null, 2));
    } catch (error) {
        console.error('Error al guardar favoritos:', error);
    }
}

module.exports = {
    leerFavoritos,
    guardarFavoritos
};

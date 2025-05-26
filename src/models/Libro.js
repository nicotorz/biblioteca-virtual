const CATEGORIAS_POR_ANIO = require('../utils/categorias');
class Libro {
  constructor(titulo, autor, key, añoDePublicacion) {
    this.titulo = titulo;
    this.autor = autor;
    this.key = key;
    this.añoDePublicacion = añoDePublicacion;
    this.categoria = this.obtenerCategoria();
  }

  obtenerDescripcion() {
    return `${this.titulo} del autor: ${this.autor} publicado en el año: ${this.añoDePublicacion}`
  }

  obtenerCategoria() {
    let año = this.añoDePublicacion;

    if (isNaN(año)) return "Desconocido";

    for (let categoria of CATEGORIAS_POR_ANIO) {
      if (año < categoria.hasta) return categoria.nombre;
    }
  }
}

module.exports = Libro;
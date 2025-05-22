class Libro {
  constructor(titulo, autor, key, añoDePublicacion) {
    this.titulo = titulo;
    this.autor = autor;
    this.key = key;
    this.añoDePublicacion = añoDePublicacion;
  }

  obtenerDescripcion() {
    return `${this.titulo} del autor: ${this.autor} publicado en el año: ${this.añoDePublicacion}`
  }
}

module.exports = Libro;
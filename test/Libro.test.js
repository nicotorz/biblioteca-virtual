const Libro = require('../src/models/Libro');

describe('Clase Libro', () => {
  it('debería instanciar correctamente', () => {
    const libro = new Libro('Título A', 'Autor B', '/works/KEY1', 1995);

    expect(libro.titulo).toBe('Título A');
    expect(libro.autor).toBe('Autor B');
    expect(libro.key).toBe('/works/KEY1');
    expect(libro.añoDePublicacion).toBe(1995);
  });

  it('debería devolver una descripción válida', () => {
    const libro = new Libro('1984', 'George Orwell', '/works/OL123', 1949);

    expect(libro.obtenerDescripcion()).toBe(
      '1984 del autor: George Orwell publicado en el año: 1949'
    );
  });

  it('debería asignar la categoría correcta según el año', () => {
    const libro = new Libro('Harry Potter', 'J.K. Rowling', '/works/OL456', 2001);
    const libro2 = new Libro('El Quijote', 'Miguel de Cervantes', '/works/OL123', 1605);
    const libro3 = new Libro('El Principito', 'Antoine de Saint-Exupery', '/works/OL2020', 1963);
    const libro4 = new Libro('Exhalación', 'Alfred A', '/works/OL2019', 2019);

    expect(libro4.categoria).toBe("Reciente");
    expect(libro.categoria).toBe('Moderno'); 
    expect(libro3.categoria).toBe("Clásico");
    expect(libro2.categoria).toBe("Muy antiguo");
  });

  it('debería devolver "Sin categoría" si el año no es válido', () => {
    const libro = new Libro('Test', 'Test', '/works/OL999', 'Desconocido');

    expect(libro.categoria).toBe('Desconocido');
  });
});

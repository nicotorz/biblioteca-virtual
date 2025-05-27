const request = require('supertest');
const app = require('../src/server'); 

describe('Libro controller', () => {

  it('deberia buscar un libro por su titulo', async () => {
    const response = await request(app).get('/api/libros/buscar?titulo=Harry%20Potter');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('titulo');
  });

  it('deberia listar los resultados de buscar un libro por su titulo', async () => {
    const response = await request(app).get('/api/libros/listar?titulo=Harry%20Potter');

     expect(response.statusCode).toEqual(200);
     expect(Array.isArray(response.body)).toBe(true);
  });

  it('deberia lanzar un error si no se pasa un titulo', async () => {
    const response = await request(app).get('/api/libros/listar');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('si el titulo del libro no tiene resultados deberia retornar una lista vacia', async () => {
    const response = await request(app).get('/api/libros/listar?titulo=LibroFalso123');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
});
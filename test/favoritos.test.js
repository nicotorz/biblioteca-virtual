const request = require('supertest');
const app = require('../src/server'); 

const libroMock = {
    titulo: "Test Book",
    autor: "Autor Test",
    key: "/works/TEST123",
    añoDePublicacion: 2023,
    categoria: "Reciente"
};

describe('Favoritos API', () => {

  it('debería devolver una lista de favoritos', async () => {
    const response = await request(app).get('/api/libros/favoritos');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  it('debería agregar un libro a favoritos', async () => {
    
    const response = await request(app)
      .post('/api/libros/favoritos')
      .send(libroMock)
      .set('Content-Type', 'application/json');

    expect([200, 201]).toContain(response.status);
  });

  it('deberia eliminar un libro de favoritos', async () => {
      await request(app)
          .post('/api/libros/favoritos')
          .send(libroMock)
          .set('Content-Type', 'application/json');

      const keySinPrefix = libroMock.key.replace('/works/', '');

      const response = await request(app)
      .delete(`/api/libros/favoritos/${keySinPrefix}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('mensaje'); 
  });

  it('deberia filtrar favoritos por año de publicacion', async () => {
      const libroAntiguo = {
          titulo: "Antiguo",
          autor: "Autor A",
          key: "/works/FILTRO_2020",
          añoDePublicacion: 1920,
          categoria: "Muy antiguo"
      }

      await request(app).post('/api/libros/favoritos').send(libroAntiguo);
      await request(app).post('/api/libros/favoritos').send(libroMock);

      const response = await request(app).get('/api/libros/favoritos?desde=2000');

      expect(response.status).toBe(200);
      expect(response.body.some(libro => libro.categoria === 'Muy antiguo')).toBe(false);
  });

  it('no deberia permitir agregar un libro duplicado a favoritos', async () => {
      //Primer Intento
      await request(app)
          .post('/api/libros/favoritos')
          .send(libroMock);
      //Segundo Intento
      const response = await request(app)
                          .post('/api/libros/favoritos')
                          .send(libroMock);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error');
  });
});
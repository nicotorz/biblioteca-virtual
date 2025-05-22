document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const titulo = params.get('titulo');

    if (!titulo) {
        document.getElementById('resultados').textContent = 'No se proporcionó un título.';
        return;
    }

    try {
        const response = await fetch(`/api/libros/listar?titulo=${encodeURIComponent(titulo)}`);
        if (!response.ok) throw new Error('Error al buscar libros');

        const resultados = await response.json();
        const lista = document.getElementById('resultados');

        if (resultados.length === 0) {
            lista.innerHTML = '<li>No se encontraron resultados.</li>';
            return;
        }

        resultados.forEach(libro => {
            const tituloLibro = libro.title;
            const li = document.createElement('li');
            const enlace = document.createElement('a');
            enlace.href = `https://openlibrary.org${libro.key}`;
            enlace.textContent = obtenerDescripcion(libro);
            li.appendChild(enlace);
            lista.appendChild(li);
        });

    } catch (err) {
        document.getElementById('resultados').innerHTML = 'Error al obtener los resultados.';
    }
});

function obtenerDescripcion(libro) {
    return `${libro.titulo} del autor: ${libro.autor} publicado en el año: ${libro.añoDePublicacion}`
}
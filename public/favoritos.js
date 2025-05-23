document.addEventListener('DOMContentLoaded', async () => {
    const lista = document.getElementById('lista-favoritos');

    try {
        const response = await fetch('/api/libros/favoritos');
        if (!response.ok) throw new Error('Error al obtener favoritos');

        const favoritos = await response.json();

        if (favoritos.length === 0) {
            lista.innerHTML = '<li>Aún no agregaste ningún libro a favoritos.</li>';
            return;
        }

        favoritos.forEach(libro => {
            renderLibroEnLista(libro, lista, true); 
        });

    } catch (err) {
        lista.innerHTML = '<li>Error al cargar los favoritos.</li>';
        console.error(err);
    }
});

async function eliminarFavorito(key, elementoLista) {
    const keySinSlash = key.replace('/works/', '');
    
    try {
        const response = await fetch(`/api/libros/favoritos/${encodeURIComponent(keySinSlash)}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || 'Error al eliminar');
            return;
        }

        elementoLista.remove();
    } catch (error) {
        console.error(error);
        alert('Error al conectar con el servidor');
    }
}


function obtenerDescripcion(libro) {
    return `${libro.titulo} del autor: ${libro.autor} publicado en el año: ${libro.añoDePublicacion}`;
}

document.addEventListener('DOMContentLoaded', () => {
    cargarFavoritos(); 
});

async function cargarFavoritos(desde = null) {
    const lista = document.getElementById('lista-favoritos');
    lista.innerHTML = '';

    try {
        let url = '/api/libros/favoritos';
        if (desde) {
            url += `?desde=${desde}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener favoritos');
        
        const favoritos = await response.json();

        if (favoritos.length === 0) {
            lista.innerHTML = '<li style="text-align: center; font-style: italic;">No se encontraron favoritos para ese año.</li>';
            return;
        }

        favoritos.forEach(libro => {
            renderLibroEnLista(libro, lista, true); 
        });

    } catch (err) {
        lista.innerHTML = '<li>Error al cargar los favoritos.</li>';
        console.error(err);
    }
}

function filtrarFavoritos() {
    const input = document.getElementById('filtro-anio');
    const anio = parseInt(input.value.trim());

    if (isNaN(anio)) {
        mostrarToast('Ingresá un año válido', 'warning');
        return;
    }

    cargarFavoritos(anio);
}

function limpiarFiltro() {
    document.getElementById('filtro-anio').value = '';
    cargarFavoritos(); 
}

async function eliminarFavorito(key, elementoLista) {
    const keySinSlash = key.replace('/works/', '');
    
    try {
        const response = await fetch(`/api/libros/favoritos/${encodeURIComponent(keySinSlash)}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarToast(data.error || 'Error al eliminar', "error");
            return;
        }

        elementoLista.remove();

        const lista = document.getElementById('lista-favoritos');
        if (lista.children.length === 0) {
            lista.innerHTML = '<li style="text-align: center; font-style: italic;">No tenés libros favoritos todavía.</li>';
        }

        mostrarToast('Libro eliminado de favoritos', 'success');
    } catch (error) {
        console.error(error);
        mostrarToast('Error al conectar con el servidor', 'error');
    }
}

function obtenerDescripcion(libro) {
    return `${libro.titulo} del autor: ${libro.autor} publicado en el año: ${libro.añoDePublicacion}`;
}

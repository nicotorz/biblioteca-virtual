function renderLibroEnLista(libro, lista, esFavorito = false) {
    const li = document.createElement('li');

    const enlace = document.createElement('a');
    enlace.href = `https://openlibrary.org${libro.key}`;
    enlace.textContent = obtenerDescripcion(libro);
    enlace.target = '_blank';

    li.appendChild(enlace);

    if (esFavorito) {
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar de favoritos';
        botonEliminar.style.marginLeft = '10px';
        botonEliminar.onclick = () => eliminarFavorito(libro.key, li);
        li.appendChild(botonEliminar);
    } else {
        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar a favoritos';
        botonAgregar.style.marginLeft = '10px';
        botonAgregar.onclick = () => agregarAFavoritos(libro);
        li.appendChild(botonAgregar);
    }

    lista.appendChild(li);
}

function obtenerDescripcion(libro) {
    return `${libro.titulo} del autor: ${libro.autor} publicado en el año: ${libro.añoDePublicacion}`;
}  

function mostrarToast(mensaje, tipo, duracion = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensaje;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duracion);
}
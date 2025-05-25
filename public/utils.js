function renderLibroEnLista(libro, lista, esFavorito = false) {
    const li = document.createElement('li');

    // Descripción basica.
    const descripcion = document.createElement('span');
    descripcion.textContent = `${libro.titulo} del autor: ${libro.autor} publicado en el año: ${libro.añoDePublicacion}`;

    // Etiqueta segun la categoria.
    const badge = document.createElement('span');
    badge.textContent = libro.categoria;
    badge.classList.add('badge', libro.categoria.toLowerCase().replace(/\s+/g, '-'));

    // Redirección a OpenLibrary por la key del libro.
    const enlace = document.createElement('a');
    enlace.href = `https://openlibrary.org${libro.key}`;
    enlace.target = '_blank';
    enlace.appendChild(descripcion);
    enlace.appendChild(badge);

    li.appendChild(enlace);

    // Boton de agregar o eliminar de favoritos segun contexto.
    const boton = document.createElement('button');
    boton.textContent = esFavorito ? 'Eliminar de favoritos' : 'Agregar a favoritos';
    boton.onclick = () => esFavorito
        ? eliminarFavorito(libro.key, li)
        : agregarAFavoritos(libro);
    li.appendChild(boton);

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
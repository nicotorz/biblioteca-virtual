async function buscar() {
    const titulo = document.getElementById('buscador').value;
    const response = await fetch(`/api/libros/listar?titulo=${encodeURIComponent(titulo)}`);
    
    if (!response.ok) {
        console.error('Error al buscar libros');
        return;
    }

    const resultados = await response.json();

    const lista = document.getElementById('resultados');
    lista.innerHTML = ''; 

    resultados.forEach(descripcion => {
        const li = document.createElement('li');
        li.textContent = descripcion;
        lista.appendChild(li);
    });
}

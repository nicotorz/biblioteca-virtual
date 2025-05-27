document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buscador').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            buscar();
        }
    });
});

function buscar() {
    const titulo = document.getElementById('buscador').value;
    if (!titulo.trim()) { 
        mostrarToast('Ingresa un titulo para empezar a buscar', 'warning');
        return;
    }
    window.location.href = `/resultados.html?titulo=${encodeURIComponent(titulo)}`;
}
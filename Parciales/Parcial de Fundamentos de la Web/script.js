function alerta(input) {
    input.Querryselector = alert ("Bienvenido a la tienda de flores")
}

function Eliminar(input) {
    input.remove();
}

const raton = document.getElementById('raton');
raton.addEventListener('mouseenter', () => { raton.textContent = "Envíar Bouquets"; });
raton.addEventListener('mouseleave', () => { raton.textContent = "Envíar Flores"; });
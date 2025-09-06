let conta1 = 0;

function contador(input) {
    conta1++;
    input.innerText = conta1 + " " + "Me Gusta";
    alert ("Gato Atigrado was liked");
}

let conta2 = 0;

function contador2(input) {
    conta2++;
    input.innerText = conta2 + " " + "Me Gusta";
    alert ("Golden Retriever was liked");
}

function SesionCerrada(input) {
    input.innerText = "Cerrar Sesion";
}

function Eliminar(input) {
    input.remove();
}

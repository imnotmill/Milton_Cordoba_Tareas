function siempreAburrido(arreglo) {
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] === "ver TV") {
            console.log("¡Entretenido!"); // si el arreglo coincide con "ver Tv" lanzar un "entretenido"
        }    
        else {
            console.log("¡Estoy Aburrido!"); // de lo contrario lanzar un "estoy aburrido"
        }
    }

}

siempreAburrido(["cantar", "correr", "salir", "ver TV"]);

function numeroDeCorte(arreglo, valorCorte) {
    let resultado = [];
    for (let i = 0; i < arreglo.length; i++) { // contar desde el 0 dentro de la lista
        if (arreglo[i] < valorCorte) {
            resultado.push(arreglo[i]); //si el número es menor a 4 lo saca de la lista
        }
    }
    return resultado;
}

console.log(numeroDeCorte([1, 2, 8, 4, 5, 7, 6], 4)); // Salida: [1, 2]

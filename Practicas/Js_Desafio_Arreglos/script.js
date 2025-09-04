function siempreAburrido(arreglo) {
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] === "ver TV") {
            console.log("¡Entretenido!");
        }    
        else {
            console.log("¡Estoy Aburrido!");
        }
    }

}

siempreAburrido(["cantar", "correr", "salir", "ver TV"]);

function numeroDeCorte(arreglo, valorCorte) {
    let resultado = [];
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] < valorCorte) {
            resultado.push(arreglo[i]);
        }
    }
    return resultado;
}

console.log(numeroDeCorte([1, 2, 8, 4, 5, 7, 6], 4)); // Salida: [1, 2]

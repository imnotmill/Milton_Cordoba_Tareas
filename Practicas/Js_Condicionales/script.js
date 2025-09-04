var número = 10;
console.log(número > 5); // Esto imprimirá “true”

var edad = 20;
console.log(edad >= 18); // Esto también será “true”

var esDeDia = true;
var esDeNoche = false;
    
if (esDeDia) { // True tiene más valor que False
    console.log("¡Explora el mundo!");
}
    
if (esDeNoche) {
    console.log("¡Anda a dormir!");
}

if (esDeDia == true) { // El True puede dar más de un resultado
    console.log("Además, ¡usa una gorra!");
}


var mascota = "gato"; // si acá pongo perro salta el primer if, si pongo otra cosa salta el segundo

if (mascota == "perro") {
    console.log("¡Tienes un amigo peludo!");
}

if (mascota != "perro") {
    console.log("¡Tienes un compañero misterioso!");
}


var clima = "cae nieve";

if (clima == "soleado") {
    console.log("¡Es un día perfecto para un picnic!");
} else if (clima == "lluvioso") {
    console.log("¡Hora de saltar en charcos!");
} else { (clima == "cae nieve")
    console.log("¡Vamos a tirarnos en trineo en la nieve!");
}


var temperatura = 25;
var estáLloviendo = false;
    
if (temperatura >= 20) {
    if (!estáLloviendo) { // !: Si "a" (temperatura) no es igual a "b" (está lloviendo) salta el mensaje
        console.log("¡Este es un buen día para dar un paseo!");
    }
}


var temperatura_2 = 25;
var estáLloviendo_2 = false;
    
if (temperatura_2 >= 20 && !estáLloviendo_2) {
    console.log("¡Este es un buen día para dar un paseo!");
}


console.log(1 === 1);
// Expected output: true

console.log("hello" === "hello");
// Expected output: true

console.log("1" === 1);
// Expected output: false

console.log(0 === false);
// Expected output: false

//(===): se utilizan para comparar si dos operandos son exactamente iguales
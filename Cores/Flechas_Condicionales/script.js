// Ejercicio 1: Conversor de temperatura
const conversorFahrenheit = (input) => (input * 9) / 5 + 32;
console.log(conversorFahrenheit(50));


// Ejercicio 2: Generador de mensajes personalizados
const generadorMensajes = (nombre, edad) =>
`Hola ${nombre}, tienes ${edad} años de edad.`;
console.log(generadorMensajes("Milton", 20));


// Ejercicio 3: Convertir de millas a kilómetros
const convertirMillasAKilometros = (millas) => millas * 1.60934;
console.log(convertirMillasAKilometros(10));


// Ejercicio 4: Consejos según el clima
const consejoClima = (clima) =>
clima === "lluvioso" ? "Lleva un paraguas" : clima === "soleado" ? "Usa gorra" : "Ponete un abrigo";

console.log(consejoClima("lluvioso"));
console.log(consejoClima("soleado"));
console.log(consejoClima("frío"));
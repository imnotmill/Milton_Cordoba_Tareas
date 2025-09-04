for (var i = 0; i < 3; i++) { // el 0 es el punto de partida y va contando hasta todos los números que van antes del 3

    console.log(i);

}

for (var i = 10; i > 0; i--) { // lo mismo pero descontando
    console.log(i);
}

var i = 0;
while (i < 3) {
    console.log(i);
    i++;
}


var inicio = 0;
var fin = 10;
    
while (inicio <= fin) { // cuando var inicio es menor o igual a var fin la cuenta para, como se cruzan en el 5 corta el conteo
    console.log("inicio: " + inicio + ", fin: " + fin);
    inicio++;
    fin--;
}
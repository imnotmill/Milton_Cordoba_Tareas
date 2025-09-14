function pizzaOven(tipocorteza, tiposalsa, quesos, adicionalsalsas) {
    var pizza = {
    corteza: tipocorteza,
    salsa: tiposalsa,
    queso: quesos,
    salsas: adicionalsalsas 
};
return pizza;
}

var p1 = pizzaOven("estilo chicago", "tradicional", ["mozzarella"], ["pepperoni", "salchicha"]);
console.log("¡una deliciosa pizza!",p1);

var p2 = pizzaOven("lanzada a mano", "marinera", ["mozzarella", "feta"], ["champiñones", "aceitunas", "cebolla"]);
console.log("¡una deliciosa pizza!",p2);
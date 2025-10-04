const heroes = [
  { nombre: "Tony Stark",       edad: 39 },
  { nombre: "Capitán América",  edad: 200 },
  { nombre: "Spider-Man",       edad: 17 },
];

const mayoresDeEdad = lista => lista.filter(({ edad }) => edad >= 18);

const resultado = mayoresDeEdad(heroes);
console.log(resultado);


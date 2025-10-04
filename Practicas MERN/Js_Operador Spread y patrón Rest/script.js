//Clonación de objetos y arreglos
const objetoInicial = { nombre: 'Mario', edad: 30 };
const objetoNuevo = { ...objetoInicial, ubicacion: 'Tokio' };

console.log(objetoNuevo); // { nombre: 'Mario', edad: 30, ubicacion: 'Tokio' }


//Combinación de arreglos
const primerArreglo = [1, 2];
const segundoArreglo = [3, 4];
const tercerArreglo = [5, 6];
const combinado = [...primerArreglo, ...segundoArreglo, ...tercerArreglo];

console.log(combinado); // [1, 2, 3, 4, 5, 6]


//Copias superficiales y profundas
const auto = {
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2020,
    detalles: { color: 'azul', combustible: 'gasolina' }
};
const autoCopia = { ...auto };
autoCopia.detalles.color = 'rojo';

console.log(auto.detalles.color); // 'rojo' (se modificó el original)


//Sin modificar el original
const autoCopiaProfunda = {...auto, detalles: { ...auto.detalles }};
autoCopiaProfunda.detalles.color = 'verde';

console.log(auto.detalles.color); // 'azul' (el original permanece intacto)
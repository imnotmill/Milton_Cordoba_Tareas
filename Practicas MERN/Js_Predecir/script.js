//Ejercicio 1:
const info = {
    personal: {
        nombre: 'Carlos',
        apellido: 'Vega',
        detalles: {
            edad: 30,
            ocupacion: 'Ingeniero'
        }
    }
};

const { personal: { detalles: { edad, salario } } } = info;
console.log(edad); 
console.log(salario); 
// 1. (edad); 30 (salario); undefined.
// 2. (edad) se encuentra dentro de "detalles", por lo que su valor es 30 y (salario) no existe dentro de "detalles" entonces se imprime undefined.
// 3. La desestructuración anidada busca dentro de "info.personal.detalles" las propiedades edad y salario. Como la propiedad "edad" sí existe se muestra su valor 
// Como la propiedad "salario" no existe dentro del objeto entonces se muestra un valor por defecto: undefined.
  

//Ejercicio 2:
const objetoA = { a: 1, b: 2, c: 3 };
const objetoB = { b: 4, c: 5, d: 6 };
const resultado = { ...objetoA, ...objetoB };
console.log(resultado);
// 1. { a: 1, b: 4, c: 5, d: 6 }
// 2. Primero se copian todas las propiedades de objetoA y después se copian todas las propiedades de objetoB.
// 3. Con el operador spread cuando hay propiedades con el mismo nombre, las que aparecen después sobrescriben a las anteriores. Entonces, objetoB sobreescribe a objetoA.


//Ejercicio 3:
const verificar = () => {
    if (true) {
        const a = 2;
        let b = 3;
        var c = 4;
    }
    console.log(c);
    console.log(a);
    console.log(b);
}
verificar();
// 1. (c); 4, (a); 2, (b); 3
// 2. (c); 4, ReferenceError: a is not defined
// 3. var es visible en toda la función (alcance global). let y const solo dentro del bloque donde se declaran (Alcance de bloques).


//Ejercicio 4:
const datos = Object.freeze({ nombre: 'Luis', edad: 29 });
datos.edad = 30;
console.log(datos.edad);
// 1. (datos.edad); 29
// 2. Como la propiedad se encuentra "congelada" siempre va a ser la misma. (datos.edad): 29
// 3. Object.freeze marca el objeto como inmutable haciendolo incapaz de cambiar sus valores.


//Ejercicio 5:
const original = [1, 2, 3];
const nuevo = original.concat(4);
console.log(original);
console.log(nuevo);
// 1. (original); [1, 2, 3], (nuevo); [1, 2, 3, 4]
// 2. Lo que hace original.concat es devolver un arreglo nuevo con los elementos del arreglo "original" + el elemento nuevo (4) en la parte final.
// 3. concat no modifica el array sino que crea una copia del original.


//Ejercicio 6:
const frutas = ['manzana', 'naranja', 'pera', 'mango'];
const [primera, segunda] = frutas;
console.log(primera);
console.log(segunda);
// 1. ["manzana"], ["naranja"]
// 2. manzana, naranja (los resultados no salen con los corchetes [] porque la desestructuración saca los elementos y los pone en variables sueltas y no en nuevos array)
// 3. Lo que hace la desestructuración es agarrar los primeros dos elementos de "frutas". "Primera: manzana" y "segunda: naranja".


//Ejercicio 7:
for (let i = 0; i < 3; i++) {
    for (let i = 0; i < 2; i++) {
        console.log(i);
    }
}
// 1. (i); 0, 1, 2, 0, 1
// 2. (i); 0, 1, 0, 1, 0, 1
// 3. Al primer bucle for le estamos pidiendo que se repita 3 veces y que, en cada vuelta, ejecute todo el segundo bucle, así hasta terminar con las repeticiones.


//Ejercicio 8:
const numeros1 = [1, 2, 3];
const numeros2 = [3, 4, 5];
const combinados = [...numeros1, ...numeros2];
console.log(combinados);
// 1. (combinados); [1, 2, 3, 4, 5]
// 2. (combinados); [1, 2, 3, 4, 5]
// 3. El operador spread copia y pega los elementos de los arrays dentro de uno nuevo, sin modificar los originales.


//Ejercicio 9:
const demostracion = () => {
    var nombre = 'Ana';
    let edad = 25;
    if (true) {
        var nombre = 'Luis';
        let edad = 30;
    }
    console.log(nombre);
    console.log(edad);
}
demostracion();
// 1. (nombre); Luis, (edad); 25
// 2. (nombre); Luis, (edad); 25
// 3. Como "var nombre" tiene un alcanze global, la segunda declaración "var nombre = 'Luis'" dentro del if sobrescribe la misma variable.
// "let edad = 30" dentro del if tiene un alcance de bloque y no puede modifica la "edad" que este afuera de ese bloque.

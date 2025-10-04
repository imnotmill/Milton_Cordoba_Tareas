const superheroe = {
  nombre: 'Wonder Woman',
  alias: 'Diana Prince',
  poderes: ['super fuerza', 'velocidad', 'durabilidad'],
  habilidades: ['combate cuerpo a cuerpo', 'uso del lazo mágico', 'vuelo'],
  creadaPor: 'William Moulton Marston',
  primeraAparicion: 'All Star Comics #8 (1941)'
};

const { primeraAparicion } = superheroe;
console.log(primeraAparicion); // Salida: All Star Comics #8 (1941)

//Ejemplo básico con arreglos
const armas = ['Espada de Athena', 'Escudo', 'Lazo de la Verdad', 'Brazaletes indestructibles'];
const [ primerArma, segundaArma ] = armas;
console.log(primerArma, segundaArma); // Salida: Espada de Athena y Escudo


//Destructuración de estructuras anidadas
const alterego = {
  nombre: 'Diana',
  apellido: 'Prince',
  email: 'diana.prince@themyscira.com',
  direcciones: [
    { direccion: 'Themyscira Palace', ciudad: 'Themyscira', codigoPostal: '0001' },
    { direccion: '7000 Hollywood Blvd', ciudad: 'Los Angeles', codigoPostal: '90028' }
  ]
};

const { direcciones } = alterego;
const [ primeraDireccion, segundaDireccion ] = direcciones;

console.log('Primera Dirección:', primeraDireccion);
console.log('Segunda Dirección:', segundaDireccion);
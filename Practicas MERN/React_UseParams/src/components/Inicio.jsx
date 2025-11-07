import React from 'react';
import { Link } from 'react-router-dom';

const recetas = [
  { nombre: 'Spaghetti Carbonara', ruta: 'spaghetti-carbonara' },
  { nombre: 'Pollo al Curry', ruta: 'pollo-curry' },
  { nombre: 'Ensalada Vegana', ruta: 'ensalada-vegana' },
];

const Inicio = () => (
  <div className="inicio-contenedor">
    <h1>Recetas de cocina</h1>
    <ul>
      {recetas.map((receta) => (
        <li key={receta.ruta}>
          <Link to={`/receta/${receta.ruta}`}>{receta.nombre}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Inicio;
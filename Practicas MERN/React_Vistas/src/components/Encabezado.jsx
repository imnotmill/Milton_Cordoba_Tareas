import React from 'react';
import { Link } from 'react-router-dom';

const Encabezado = () => {
  return (
    <header className="header">
      <h1>Mi Aplicación</h1>
      <nav>
        <div className="encabezadoconlinks">
          <Link to="/inicio">Inicio</Link>
          <Link to="/planetario">Planetario</Link>
        </div>
      </nav>
    </header>
  );
};

export default Encabezado;
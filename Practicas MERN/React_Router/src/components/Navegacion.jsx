import React from 'react';
import { Link } from 'react-router-dom';

const Navegacion = () => (
  <nav>
    <ul>
      <li><Link to="/">Inicio</Link></li>
      <li><Link to="/acerca">Acerca de</Link></li>
    </ul>
  </nav>
);

export default Navegacion;
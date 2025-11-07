import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './views/Inicio';
import Planetario from './views/Planetario';
import NoEncontrado from './components/NoEncontrado/NoEncontrado';
import Encabezado from './components/Encabezado';
import PieDePagina from './components/PieDePagina';

const App = () => (
  <div>
    <Encabezado />
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/planetario" element={<Planetario />} />
      <Route path="*" element={<NoEncontrado />} />
    </Routes>
    <PieDePagina />
  </div>
);

export default App;
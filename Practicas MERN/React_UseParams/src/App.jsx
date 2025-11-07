import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Receta from './components/Receta';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/receta/:nombreReceta" element={<Receta />} />
    </Routes>
  </Router>
);

export default App;
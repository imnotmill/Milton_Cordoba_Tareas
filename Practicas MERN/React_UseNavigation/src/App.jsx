import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Respuestas from './components/Respuestas';
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/respuestas" element={<Respuestas />} />
    </Routes>
  </Router>
);

export default App;
import React from 'react';
import { useLocation } from 'react-router-dom';

const Respuestas = () => {
  const location = useLocation();
  const { respuesta } = location.state || {};

  return (
    <div>
      <h1>Respuestas</h1>
      <p>¿Tu color favorito es <strong>{respuesta}</strong>? ¡Excelente elección!</p>
      <button onClick={() => window.history.back()}>Volver</button>
      

    </div>
  );
};

export default Respuestas;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const [respuesta, setRespuesta] = useState('');
  const navigate = useNavigate();

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    navigate('/respuestas', { state: { respuesta } });
  };

  return (
    <div>
      <h1>Pregunta rápida</h1>
      <form onSubmit={manejarEnvio}>
        <label>
          ¿Cuál es tu color favorito?
          <input
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Inicio;
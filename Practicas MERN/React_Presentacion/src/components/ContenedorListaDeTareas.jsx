import React, { useState } from 'react';
import ListaDeTareas from './ListaDeTareas';

const ContenedorListaDeTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const manejarAgregarTarea = () => {
    if (nuevaTarea.trim()) {
      setTareas([...tareas, nuevaTarea.trim()]);
      setNuevaTarea('');
    }
  };

  const manejarCambio = (e) => {
    setNuevaTarea(e.target.value);
  };

  return (
    <ListaDeTareas
      tareas={tareas}
      nuevaTarea={nuevaTarea}
      onAgregarTarea={manejarAgregarTarea}
      onChange={manejarCambio}
    />
  );
};

export default ContenedorListaDeTareas;
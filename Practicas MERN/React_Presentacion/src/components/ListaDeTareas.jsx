import React from 'react';

const ListaDeTareas = ({ tareas, nuevaTarea, onAgregarTarea, onChange }) => {
  return (
    <div>
      <h2>Lista de tareas</h2>
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>{tarea}</li>
        ))}
      </ul>
      <input
        type="text"
        value={nuevaTarea}
        onChange={onChange}
        placeholder="Nueva tarea"
      />
      <button onClick={onAgregarTarea}>Añadir tarea</button>
    </div>
  );
};

export default ListaDeTareas;
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>¡Bienvenidos a mi aplicación de React!</h1>

        <h2>Lista de Cosas por Hacer:</h2>

        <ul>
          <li>Aprende React</li>
          <li>Practica con Vite</li>
          <li>Construye Proyectos Increibles</li>
        </ul>
      </div>
    </>
  );
}

export default App;

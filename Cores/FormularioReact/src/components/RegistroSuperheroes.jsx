import { useState } from "react";
import "../css/App.css";

function RegistroSuperheroes() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [titulo, setTitulo] = useState("Registro de Superhéroes");
  const [errores, setErrores] = useState({});
  const [heroes, setHeroes] = useState([]);

  const manejarCambio = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const todosVacios = Object.values(formData).every((v) => v.trim() === "");
    if (todosVacios) {
      setErrores({});
      return;
    }

    const nuevosErrores = {};

    if (formData.nombre.length < 4) {
      nuevosErrores.nombre = "El nombre debe tener al menos 4 caracteres.";
    }

    if (formData.apellido.length < 4) {
      nuevosErrores.apellido = "El apellido debe tener al menos 4 caracteres.";
    }

    if (formData.correo.length < 10) {
      nuevosErrores.correo = "El correo electrónico es demasiado corto.";
    }

    if (formData.contraseña.length < 12) {
      nuevosErrores.contraseña =
        "La contraseña debe tener al menos 12 caracteres.";
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      nuevosErrores.confirmarContraseña = "Las contraseñas no coinciden.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const nuevoHeroe = {
        id: Date.now(),
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
      };
      setHeroes((prev) => [nuevoHeroe, ...prev]);
      setTitulo("¡Superhéroe registrado!");
      setFormData({
        nombre: "",
        apellido: "",
        correo: "",
        contraseña: "",
        confirmarContraseña: "",
      });
    }
  };

  return (
    <div className="registro-container">
      <h1>Bienvenido a la Liga de Superhéroes</h1>
      <h2>{titulo}</h2>

      <form onSubmit={manejarEnvio} className="formulario">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={manejarCambio}
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}

        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={manejarCambio}
        />
        {errores.apellido && <p className="error">{errores.apellido}</p>}

        <label>Correo Electrónico:</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={manejarCambio}
        />
        {errores.correo && <p className="error">{errores.correo}</p>}

        <label>Contraseña:</label>
        <input
          type="password"
          name="contraseña"
          value={formData.contraseña}
          onChange={manejarCambio}
        />
        {errores.contraseña && <p className="error">{errores.contraseña}</p>}

        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirmarContraseña"
          value={formData.confirmarContraseña}
          onChange={manejarCambio}
        />
        {errores.confirmarContraseña && (
          <p className="error">{errores.confirmarContraseña}</p>
        )}

        <button type="submit">Crear Superhéroe</button>
      </form>

      <section className="lista-heroes">
        {heroes.map((h) => (
          <div key={h.id} className="hero-card">
            <h3>
              {h.nombre} {h.apellido}
            </h3>
            <p className="correo">{h.correo}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default RegistroSuperheroes;

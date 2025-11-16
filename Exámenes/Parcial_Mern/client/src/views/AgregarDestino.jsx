import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css/Destinos.module.css";
import localStyles from "../css/AgregarDestino.module.css";

const extensionesImagen = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];

function validarURLImagen(url) {
  if (!url) return false;
  return extensionesImagen.some(ext => url.toLowerCase().endsWith(ext));
}

const AgregarDestino = ({ listaPeliculas, setListaPeliculas }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tips: "",
    season: "",
    cost: ""
  });
  // cliente: validaciones removidas (se delega al servidor)
  const navigate = useNavigate();

  // Se elimina la validación en el cliente según solicitud.

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // No hay validación en cliente; se envía directamente y el servidor responderá con errores si los hubiera.
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        tips: form.tips.trim(),
        season: form.season,
        cost: Number(form.cost)
      };
      const res = await axios.post(
        "http://localhost:8000/api/destinos",
        payload,
        { headers: { token_user: token } }
      );
      setListaPeliculas(prev => [...prev, res.data]);
      navigate('/destinos');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const serverErrors = error.response.data?.errors;
        if (serverErrors) {
          alert(Object.values(serverErrors).flat().join('\n'));
          return;
        }
      }
    }
  };

  return (
    <div className={localStyles.container}>
      <h2 className={localStyles.subtitle}>Agregar destino</h2>
      <div className={localStyles.content}>
        <form onSubmit={handleSubmit} className={localStyles.form}>
          <div className={localStyles.field}>
            <label className={localStyles.label}>Lugar</label>
            <input name="title" value={form.title} onChange={handleChange} className={localStyles.input} />
          </div>
          <div className={localStyles.field}>
            <label className={localStyles.label}>Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange} className={localStyles.textarea} />
          </div>
          <div className={localStyles.field}>
            <label className={localStyles.label}>Tips viajeros</label>
            <textarea name="tips" value={form.tips} onChange={handleChange} className={localStyles.textarea} />
          </div>
          <div className={localStyles.field}>
            <label className={localStyles.label}>Mejor época para visitar</label>
            <select name="season" value={form.season} onChange={handleChange} className={localStyles.select}>
              <option value="">-- Selecciona --</option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
            
          </div>
          <div className={localStyles.field}>
            <label className={localStyles.label}>Costo promedio</label>
            <input name="cost" value={form.cost} onChange={handleChange} className={localStyles.input} />
          </div>
          <button type="submit" className={localStyles.submit}>Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarDestino;

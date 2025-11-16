import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import localStyles from "../css/AgregarDestino.module.css";

const EditarDestino = ({ setListaPeliculas }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    tips: "",
    season: "",
    cost: ""
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate('/login');
          return;
        }
        const res = await axios.get(`http://localhost:8000/api/destinos/${id}`, { headers: { token_user: token } });
        const data = res.data;
        setForm({
          title: data.title || "",
          description: data.description || "",
          tips: data.tips || "",
          season: data.season || "",
          cost: data.cost != null ? String(data.cost) : ""
        });
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("token");
          navigate('/login');
        }
      }
    };
    fetchPelicula();
  }, [id, navigate]);

  const validar = () => {
    const err = {};
    if (!form.title) err.title = "Por favor proporciona el lugar";
    else if (form.title.length < 3) err.title = "El lugar debe tener al menos 3 caracteres";

    if (!form.description) err.description = "Por favor proporciona la descripción";
    else if (form.description.length < 10) err.description = "La descripción debe tener al menos 10 caracteres";

    if (!form.tips) err.tips = "Por favor proporciona la tips";
    else if (form.tips.length < 10) err.tips = "Los tips deben tener al menos 10 caracteres";

    if (!form.season) err.season = "Por favor proporciona la época";

    if (!form.cost && form.cost !== 0) err.cost = "Por favor proporciona el costo";
    else if (isNaN(Number(form.cost)) || Number(form.cost) <= 0) err.cost = "El costo promedio debe ser un número positivo";

    return err;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validar();
    setErrores(err);
    if (Object.keys(err).length > 0) return;
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
      const res = await axios.put(`http://localhost:8000/api/destinos/${id}`, payload, { headers: { token_user: token } });
      if (typeof setListaPeliculas === 'function') {
        setListaPeliculas(prev => prev.map(p => (p._id === res.data._id ? res.data : p)));
      }
      // después de actualizar en la base de datos, redirigir a la página de inicio /destinos
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
          setErrores(serverErrors);
          return;
        }
      }
    }
  };

  return (
    <div className={localStyles.container}>
      <h2 className={localStyles.subtitle}>Editar destino</h2>
      
      <div className={localStyles.content}>
        <form onSubmit={handleSubmit} className={localStyles.form}>
          <div className={localStyles.field}>
            <label className={localStyles.label}>Lugar</label>
            <input name="title" value={form.title} onChange={handleChange} className={localStyles.input} />
            {errores.title && <span className={localStyles.error}>{errores.title}</span>}
          </div>

          <div className={localStyles.field}>
            <label className={localStyles.label}>Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange} className={localStyles.textarea} />
            {errores.description && <span className={localStyles.error}>{errores.description}</span>}
          </div>

          <div className={localStyles.field}>
            <label className={localStyles.label}>Tips viajeros</label>
            <textarea name="tips" value={form.tips} onChange={handleChange} className={localStyles.textarea} />
            {errores.tips && <span className={localStyles.error}>{errores.tips}</span>}
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
            {errores.season && <span className={localStyles.error}>{errores.season}</span>}
          </div>

          <div className={localStyles.field}>
            <label className={localStyles.label}>Costo promedio</label>
            <input name="cost" value={form.cost} onChange={handleChange} className={localStyles.input} />
            {errores.cost && <span className={localStyles.error}>{errores.cost}</span>}
          </div>

          <button type="submit" className={localStyles.submit}>Guardar cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditarDestino;

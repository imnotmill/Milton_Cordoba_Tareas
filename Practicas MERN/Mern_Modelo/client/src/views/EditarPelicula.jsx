import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import localStyles from "../css/NuevaPelicula.module.css";

const extensionesImagen = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];

function validarURLImagen(url) {
  if (!url) return false;
  return extensionesImagen.some(ext => url.toLowerCase().endsWith(ext));
}

const EditarPelicula = ({ setListaPeliculas }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    year: "",
    director: "",
    genre: "",
    img: ""
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
        const res = await axios.get(`http://localhost:8000/api/peliculas/${id}`, { headers: { token_user: token } });
        const data = res.data;
        setForm({
          title: data.title || "",
          year: data.year ? String(data.year) : "",
          director: data.director || "",
          genre: data.genre || "",
          img: data.img || ""
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
    if (!form.title) err.title = "Por favor proporciona el título de la película";
    else if (form.title.length < 5) err.title = "El título debe tener al menos 5 caracteres";

    const currentYear = new Date().getFullYear();
    if (!form.year) err.year = "Por favor proporciona el año de lanzamiento";
    else if (!/^[0-9]+$/.test(form.year)) err.year = "El año debe ser un número válido";
    else if (parseInt(form.year) < 1888 || parseInt(form.year) > currentYear) err.year = `El año debe estar entre 1888 y ${currentYear}`;

    if (!form.director) err.director = "Por favor proporciona el director de la película";
    else if (form.director.length < 5) err.director = "El director debe tener al menos 5 caracteres";

    if (!form.genre) err.genre = "Por favor proporciona género";
    else if (form.genre.length < 3) err.genre = "El género debe tener al menos 3 caracteres";

    if (!form.img) err.img = "Por favor proporciona una URL válida con la imagen";
    else if (!validarURLImagen(form.img)) err.img = "La URL debe terminar con una extensión de imagen válida";

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
        year: parseInt(form.year, 10),
        director: form.director.trim(),
        genre: form.genre.trim(),
        img: form.img.trim()
      };
      const res = await axios.put(`http://localhost:8000/api/peliculas/${id}`, payload, { headers: { token_user: token } });
      if (typeof setListaPeliculas === 'function') {
        setListaPeliculas(prev => prev.map(p => (p._id === res.data._id ? res.data : p)));
      }
      navigate(`/peliculas/${res.data._id}`);
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
      <h1 className={localStyles.title}>Editar película</h1>
      <form onSubmit={handleSubmit} className={localStyles.form}>
        <div className={localStyles.field}>
          <label className={localStyles.label}>Título</label>
          <input name="title" value={form.title} onChange={handleChange} className={localStyles.input} />
          {errores.title && <span className={localStyles.error}>{errores.title}</span>}
        </div>
        <div className={localStyles.field}>
          <label className={localStyles.label}>Año</label>
          <input name="year" value={form.year} onChange={handleChange} className={localStyles.input} />
          {errores.year && <span className={localStyles.error}>{errores.year}</span>}
        </div>
        <div className={localStyles.field}>
          <label className={localStyles.label}>Director</label>
          <input name="director" value={form.director} onChange={handleChange} className={localStyles.input} />
          {errores.director && <span className={localStyles.error}>{errores.director}</span>}
        </div>
        <div className={localStyles.field}>
          <label className={localStyles.label}>Género</label>
          <input name="genre" value={form.genre} onChange={handleChange} className={localStyles.input} />
          {errores.genre && <span className={localStyles.error}>{errores.genre}</span>}
        </div>
        <div className={localStyles.field}>
          <label className={localStyles.label}>URL a imagen</label>
          <input name="img" value={form.img} onChange={handleChange} className={localStyles.input} />
          {errores.img && <span className={localStyles.error}>{errores.img}</span>}
        </div>
        <button type="submit" className={localStyles.submit}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarPelicula;

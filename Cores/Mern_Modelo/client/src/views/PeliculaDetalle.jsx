import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import pelStyles from '../css/PeliculaDetalle.module.css';
import mainStyles from '../css/Peliculas.module.css';

function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

const PeliculaDetalle = ({ setLogin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);

  const fetchPelicula = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:8000/api/peliculas/${id}`, { headers: { token_user: token } });
      setPelicula(res.data);
      if (token) {
        setLogin(true);
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('token');
        setLogin(false);
        navigate('/login');
        return;
      }
      setError('No se pudo cargar la película');
    }
  };

  const handleEliminar = async () => {
    if (!confirm('¿Estás seguro que deseas eliminar esta película?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/api/peliculas/${id}`, { headers: { token_user: token } });
      navigate('/');
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('token');
        setLogin(false);
        navigate('/login');
        return;
      }
      setError('No se pudo eliminar la película');
    }
  };

  useEffect(() => { fetchPelicula(); }, [id]);

  if (error) return (
    <div style={{ padding: 24 }}>
      <h2>Error</h2>
      <p>{error}</p>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );

  if (!pelicula) return (
    <div style={{ padding: 24 }}>
      <p>Cargando...</p>
    </div>
  );

  const user = localStorage.getItem('token') ? decodeJwt(localStorage.getItem('token')) : null;

  return (
    <div className={mainStyles['peliculas-container']}>
      <h1 className={pelStyles.title}>{pelicula.title}</h1>
      <div className={pelStyles['detalle-wrapper']}>
        <div className={pelStyles.card}>
          <div className={pelStyles['info-list']}>
            <div className={pelStyles.label}>Director</div>
            <div className={pelStyles.value}>{pelicula.director}</div>
            <div className={pelStyles.label}>Año de lanzamiento</div>
            <div className={pelStyles.value}>{pelicula.year}</div>
            <div className={pelStyles.label}>Género</div>
            <div className={pelStyles.value}>{pelicula.genre}</div>
          </div>
          <img src={pelicula.img} alt={pelicula.title} className={pelStyles.img} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/220x320?text=No+image'; }} />
          <button className={pelStyles['edit-btn']} onClick={() => navigate(`/peliculas/${pelicula._id}/edit`)}>Editar</button>
        </div>
      </div>
    </div>
  );
};

export default PeliculaDetalle;

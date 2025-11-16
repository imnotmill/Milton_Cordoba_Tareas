import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/Peliculas.module.css';

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

const Peliculas = ({ listaPeliculas, setListaPeliculas, setLogin, setMe }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? decodeJwt(token) : null;

  const fetchPeliculas = () => {
    if (!token) {
      setLogin(false);
      navigate('/login');
      return;
    }
    axios.get('http://localhost:8000/api/peliculas', { headers: { token_user: token } })
      .then(res => {
        setListaPeliculas(res.data);
        setLogin(true);
        setMe(user);
      })
      .catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('token');
          setLogin(false);
          navigate('/login');
        }
      });
  };

  const handleEliminar = (id) => {
    if (!confirm('¿Estás seguro que deseas eliminar esta película?')) return;
    const tokenLocal = localStorage.getItem('token');
    axios.delete(`http://localhost:8000/api/peliculas/${id}`, { headers: { token_user: tokenLocal } })
      .then(() => {
        setListaPeliculas(listaPeliculas.filter(p => p._id !== id));
        navigate('/');
      })
      .catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('token');
          setLogin(false);
          navigate('/login');
        }
      });
  };

  useEffect(() => { fetchPeliculas(); }, []);

  return (
    <div className={styles['peliculas-container']}>
      <div className={styles['peliculas-header']}>
        <div className={styles['peliculas-bienvenida']}>{user && `Bienvenido de vuelta ${user.firstname || user.name || ''} ${user.lastname || ''}`}</div>
      </div>

      <div className={styles['peliculas-grid']}>
        {Array.isArray(listaPeliculas) && listaPeliculas.map((p) => (
          <div key={p._id} className={styles['pelicula-card']}>
            <img className={styles['pelicula-img']} src={p.img} alt={p.title} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/220x320?text=No+image'; }} />
            <div className={styles['pelicula-title']}>{p.title}</div>
            <div style={{ marginBottom: 8 }}>{p.year} • {p.director}</div>
            <div className={styles['pelicula-btns']}>
              <button onClick={() => navigate(`/peliculas/${p._id}`)} className={styles['pelicula-btn-detalle']}>Detalle</button>
              <button onClick={() => handleEliminar(p._id)} className={styles['pelicula-btn-eliminar']}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peliculas;

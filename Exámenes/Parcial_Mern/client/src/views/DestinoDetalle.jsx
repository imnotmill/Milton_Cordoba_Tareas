import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import pelStyles from '../css/DestinoDetalle.module.css';
import mainStyles from '../css/Destinos.module.css';

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

const DestinoDetalle = ({ setLogin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);

  const fetchPelicula = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:8000/api/destinos/${id}`, { headers: { token_user: token } });
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
      setError('No se pudo cargar el destino');
    }
  };

  const handleEliminar = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/api/destinos/${id}`, { headers: { token_user: token } });
      navigate('/destinos');
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('token');
        setLogin(false);
        navigate('/login');
        return;
      }
      setError('No se pudo eliminar el destino');
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
    <div className={`${mainStyles['peliculas-container']} ${pelStyles.outer}`}>
      <h1 className={pelStyles.title}>{pelicula.title}</h1>
      <div className={pelStyles['detalle-wrapper']}>
        <div className={pelStyles.card}>
          <div className={pelStyles['info-list']}>
            <div>
              <div className={pelStyles.label}>Descripción</div>
              <div className={pelStyles.value}>{pelicula.description}</div>
            </div>
            <div>
              <div className={pelStyles.label}>Tips viajeros</div>
              <div className={pelStyles.value}>{pelicula.tips}</div>
            </div>
            <div>
              <div className={pelStyles.label}>Mejor época para visitar</div>
              <div className={pelStyles.value}>{pelicula.season}</div>
            </div>
            <div>
              <div className={pelStyles.label}>Costo promedio</div>
              <div className={pelStyles.value}>$ {pelicula.cost && pelicula.cost.toLocaleString()}</div>
            </div>
          </div>
          {user && (
            <div className={pelStyles['action-row']}>
              <button className={pelStyles['delete-btn']} onClick={handleEliminar}>Eliminar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinoDetalle;

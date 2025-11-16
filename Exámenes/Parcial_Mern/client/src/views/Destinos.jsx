import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/Destinos.module.css';

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

const Destinos = ({ listaPeliculas, setListaPeliculas, setLogin, setMe }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? decodeJwt(token) : null;

  const fetchPeliculas = () => {
    if (!token) {
      setLogin(false);
      navigate('/login');
      return;
    }
    axios.get('http://localhost:8000/api/destinos', { headers: { token_user: token } })
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
    const tokenLocal = localStorage.getItem('token');
    axios.delete(`http://localhost:8000/api/destinos/${id}`, { headers: { token_user: tokenLocal } })
      .then(() => {
        setListaPeliculas(listaPeliculas.filter(p => p._id !== id));
        navigate('/destinos');
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

      <div className={styles['list-wrapper']}>
        <div className={styles['list-card']}>
          <table className={styles['list-table']}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Detalle</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(listaPeliculas) && listaPeliculas.map((p) => (
                <tr key={p._id}>
                  <td className={styles['td-title']}>{p.title}</td>
                  <td><button className={styles['link-btn']} onClick={() => navigate(`/destinos/${p._id}`)}>Ver</button></td>
                  <td><button className={styles['link-btn']} onClick={() => navigate(`/destinos/${p._id}/edit`)}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Destinos;

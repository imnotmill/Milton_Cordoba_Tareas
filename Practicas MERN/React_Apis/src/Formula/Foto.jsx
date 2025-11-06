import { useState } from 'react';
import axios from 'axios';

const Foto = () => {
  const [fotoGato, setFotoGato] = useState('');
  const [cargando, setCargando] = useState(false);

  const obtenerFoto = async () => {
    setCargando(true);
    try {
      const respuesta = await axios.get('https://api.thecatapi.com/v1/images/search');
      setFotoGato(respuesta.data[0].url);
    } catch (error) {
      console.error('Error al obtener la foto:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>API de gatitos</h1>
      <button
        onClick={obtenerFoto}
        disabled={cargando}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        {cargando ? 'Cargando...' : 'Obtener foto'}
      </button>
      <div style={{ marginTop: '20px' }}>
        {fotoGato && <img src={fotoGato} alt="Foto de un gatito" />}
      </div>
    </div>
  );
};

export default Foto;
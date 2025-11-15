import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const UpdatePlaylistForm = () => {
  const [playlist, setPlaylist] = useState({ name: "", songs: [] });
  const [allSongs, setAllSongs] = useState([]);
  const [selected, setSelected] = useState({});
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const URL = `${API}/api/playlist/${id}`;
  const SONGS_URL = `${API}/api/canciones`;
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener playlist y todas las canciones
    axios(URL, { headers: { token_user: localStorage.getItem("token") } })
      .then((response) => {
        setPlaylist(response.data);
        // Marcar seleccionadas (soporta canciones con solo título)
        const sel = {};
        (response.data.songs || []).forEach(s => {
          if (s && s.title) sel[s.title] = true;
        });
        setSelected(sel);
      })
      .catch((e) => setError(e));
    axios(SONGS_URL, { headers: { token_user: localStorage.getItem("token") } })
      .then(res => setAllSongs(res.data))
      .catch(() => {});
  }, [id]);

  const handleChange = (e) => {
    setPlaylist({ ...playlist, [e.target.name]: e.target.value });
  };

  const toggle = (title) => {
    setSelected(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // Validación frontend
  const validate = (values) => {
    const errs = {};
    if (!values.name || values.name.trim() === "") {
      errs.name = "El nombre de la playlist es obligatorio.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const songs = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
    const frontendErrors = validate(playlist);
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }
    setErrors({});
    axios
      .put(URL, { name: playlist.name, songs }, { headers: { token_user: localStorage.getItem("token") } })
      .then(() => {
        navigate(`/playlists/${id}`);
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrors(e.response.data.errors);
        } else if (e.response && e.response.data && e.response.data.message) {
          setErrors({ general: e.response.data.message });
        } else {
          setErrors({ general: "Error inesperado al actualizar la playlist." });
        }
      });
  };

  // Mostrar error general si existe
  // (El error de carga inicial se puede mostrar aquí si lo deseas)

  return (
    <div className="page">
      <h2 className="page-title">Editar Playlist</h2>
      <form className="form" onSubmit={handleSubmit}>
        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
        <label>
          Nombre:
          <input
            className="input"
            type="text"
            name="name"
            value={playlist.name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <h2 className="page-subtitle" style={{textAlign:'center', marginTop: '16px'}}>Elegir canciones</h2>
        <div style={{maxWidth: 500, margin: '0 auto 16px'}}>
          {allSongs.map(song => (
            <label key={song.title} style={{display:'grid', gridTemplateColumns:'20px 1fr', alignItems:'center', gap:8, margin:'10px 0'}}>
              <input type="checkbox" checked={!!selected[song.title]} onChange={()=> toggle(song.title)} />
              <span>{song.title}</span>
            </label>
          ))}
        </div>

        <button className="btn" type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default UpdatePlaylistForm;

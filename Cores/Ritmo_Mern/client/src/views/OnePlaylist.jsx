import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";

const OnePlaylist = (props) => {
  const [playlist, setPlaylist] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const URL = `${API}/api/playlist/${id}`;
  const navigate = useNavigate();

  const getData = () => {
    axios(URL, { headers: { token_user: localStorage.getItem("token") } })
      .then((response) => setPlaylist(response.data))
      .catch((e) => setError(e));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  if (error) {
    return (
      <div className="page">
        <h2 className="page-title">La playlist no existe</h2>
        <NotFound />
      </div>
    );
  }

  const deleteOne = () => {
    axios
      .delete(URL, { headers: { token_user: localStorage.getItem("token") } })
      .then(() => {
        // Si existen las props, actualiza la lista, si no, solo navega
        if (props.setListaPlaylists && props.listaPlaylists) {
          props.setListaPlaylists(props.listaPlaylists.filter((pl) => pl._id !== id));
        }
        navigate("/playlists");
      })
      .catch((e) => console.log(e));
  };

  const updatePlaylist = () => {
    navigate(`/playlists/update/${id}`);
  };

  return (
    <div className="page">
      <h2 className="page-title">Playlist Details</h2>
      <p>
        <strong>Name:</strong> {playlist.name}
      </p>
      <div>
        <strong>Canciones:</strong>
        {playlist.songs && playlist.songs.length > 0 ? (
          <ul style={{marginTop:8}}>
            {playlist.songs.map(song => (
              <li key={song._id || song.title}>
                {song.title} <span className="muted">{song.artist ? `by ${song.artist}` : ''}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span> No hay canciones en esta playlist.</span>
        )}
      </div>
      <div className="actions">
        <button className="btn danger" onClick={deleteOne}>
          Delete
        </button>
        <button className="btn" onClick={updatePlaylist}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default OnePlaylist;

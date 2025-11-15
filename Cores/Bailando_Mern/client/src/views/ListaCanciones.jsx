import {Link} from 'react-router-dom'
import { useMemo, useState } from 'react'


const ListaCanciones = ({listaSongs}) => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    if(!q) return listaSongs
    return listaSongs.filter(s=>
      s.title?.toLowerCase().includes(q) ||
      s.artist?.toLowerCase().includes(q) ||
      s.genre?.toLowerCase().includes(q)
    )
  },[listaSongs, query])

  return (
    <div className="page">
      <h1 className="page-title">All Songs</h1>
      <input
        className="input"
        placeholder="Search songs by name, artist, or genre"
        value={query}
        onChange={(e)=> setQuery(e.target.value)}
      />

      <ol className="list">
        {filtered.map((song) => (
          <li key={song._id} className="list-item">
            <Link to={`/canciones/${song._id}`} className="link">
              {song.title}
            </Link>
            <span className="muted"> by {song.artist} ({song.genre})</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ListaCanciones;
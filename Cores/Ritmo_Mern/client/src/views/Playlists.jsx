import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([])
  const [query, setQuery] = useState('')

  useEffect(()=>{
    const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    const URL = `${API}/api/playlist`;
    axios(URL).then(res=> setPlaylists(res.data)).catch(()=>{})
  },[])

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    if(!q) return playlists
    return playlists.filter(p=> p.name?.toLowerCase().includes(q))
  },[playlists, query])

  return (
    <div className="page">
      <h1 className="page-title">All Playlists</h1>
      <input className="input" placeholder="Search playlists" value={query} onChange={(e)=> setQuery(e.target.value)} />

      <ol className="list">
        {filtered.map(p => (
          <li key={p._id} className="list-item">
            <Link className="link" to={`/playlists/${p._id}`}>{p.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Playlists

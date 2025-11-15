import { useMemo, useState } from 'react'
import axios from 'axios'

const CreatePlaylist = ({listaSongs}) => {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState({})
  const [message, setMessage] = useState('')

  const toggle = (title) => {
    setSelected(prev => ({...prev, [title]: !prev[title]}))
  }

  const allTitles = useMemo(()=> listaSongs.map(s=> s.title), [listaSongs])

  const submit = async (e) =>{
    e.preventDefault()
    setMessage('')
    const songs = Object.entries(selected).filter(([,v])=> v).map(([k])=> k)
    try{
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const URL = `${API}/api/playlist`;
      await axios.post(URL, {name, songs})
      setMessage('Playlist created successfully')
      setName(''); setSelected({})
    }catch(e){
      setMessage('Could not create playlist')
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h1 className="page-title">Create New Playlist</h1>
      <div className="field">
        <label htmlFor="name">Playlist Name:</label>
        <input className="input" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
      </div>

      <h2 className="page-subtitle" style={{textAlign:'center', marginTop: '16px'}}>Choose Songs</h2>

      <div style={{maxWidth: 500, margin: '0 auto 16px'}}>
        {allTitles.map(title => (
          <label key={title} style={{display:'grid', gridTemplateColumns:'20px 1fr', alignItems:'center', gap:8, margin:'10px 0'}}>
            <input type="checkbox" checked={!!selected[title]} onChange={()=> toggle(title)} />
            <span>{title}</span>
          </label>
        ))}
      </div>

      <div style={{textAlign:'center', marginTop: 12}}>
        <button className="btn primary" type="submit">Create Playlist</button>
      </div>
      {message && <p style={{textAlign:'center', marginTop:12}}>{message}</p>}
    </form>
  )
}

export default CreatePlaylist

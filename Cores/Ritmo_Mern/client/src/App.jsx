import { useState } from 'react'
import {Routes, Route, NavLink, useNavigate} from 'react-router-dom'
import './App.css'
import SongsApi from './components/SongsApi'
import ListaCanciones from './views/ListaCanciones'
import OneSong from './views/OneSong'
import NotFound from './components/NotFound'
import FormSongs from './views/FormSongs'
import UpdateSongsForm from './views/UpdateSongsForm'
import Login from './views/Login'
import Register from './views/Register'
import Playlists from './views/Playlists'
import CreatePlaylist from './views/CreatePlaylist'
import OnePlaylist from './views/OnePlaylist';
import UpdatePlaylistForm from './views/UpdatePlaylistForm';

function App() {
  const [listaSongs, setListasSongs] = useState([])
  const [login, setLogin] = useState(false)
  const navigate = useNavigate();
  const logOut = ()=>{
    localStorage.removeItem("token")
    setLogin(false)
    navigate('/login')
  }

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="nav-left">
          <NavLink to="/canciones" className={({isActive})=> isActive? 'active' : ''}>Songs</NavLink>
          <NavLink to="/playlists" className={({isActive})=> isActive? 'active' : ''}>Playlists</NavLink>
          <NavLink to="/canciones/new" className={({isActive})=> isActive? 'active' : ''}>Add Song</NavLink>
          <NavLink to="/playlists/new" className={({isActive})=> isActive? 'active' : ''}>Add Playlist</NavLink>
        </div>
        <div className="nav-right">
          {login ? (
            <button className="btn" onClick={logOut}>Log out</button>
          ) : (
            <>
              <NavLink to="/login" className={({isActive})=> isActive? 'active' : ''}>Login</NavLink>
              <NavLink to="/register" className={({isActive})=> isActive? 'active' : ''}>Register</NavLink>
            </>
          )}
        </div>
      </nav>

      <SongsApi setListasSongs={setListasSongs} login={login} setLogin={setLogin}/>

      <main className="container">
        <Routes>
          <Route path='/' element={<ListaCanciones listaSongs={listaSongs} />}/>
          <Route path='/canciones' element={< ListaCanciones listaSongs={listaSongs} />}/>
          <Route path='/canciones/:id' element={<OneSong listaSongs={listaSongs}  setListasSongs={setListasSongs}/> }/>
          <Route path='/canciones/new' element={< FormSongs listaSongs={listaSongs}  setListasSongs={setListasSongs}/>}/>
          <Route path='/canciones/update/:id' element={< UpdateSongsForm listaSongs={listaSongs} setListasSongs={setListasSongs} />}/>
          <Route path='/playlists' element={<Playlists/>}/>
          <Route path='/playlists/new' element={<CreatePlaylist listaSongs={listaSongs}/>}/>
          <Route path='/playlists/:id' element={<OnePlaylist />} />
          <Route path='/playlists/update/:id' element={<UpdatePlaylistForm />} />
          <Route path='/login' element={< Login setLogin={setLogin} />}/>
          <Route path='/register' element={< Register setLogin={setLogin} />}/>
          <Route path='*' element={< NotFound/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
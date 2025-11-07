import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/home.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ArtPiece from './components/ArtPiece.jsx';

function App() {
  const galleryList = [
    {name: 'Fuera de Este Mundo', author: "Milton Cordoba", img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanFwb2E4emFzNnYyaW82c3FycDkyZzQ5N3hxNnp0ZDE4ZDVqNWU5dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tXLpxypfSXvUc/giphy.gif'},
    {name: 'Pacientes Holográficos', author: "Milton Cordoba", img: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eXkwcWd3MGYyYjV6NWd4dmt2czJjMWh4ZHo5bGdleWVvZzFwOWx5MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/m6xHedeVlSDIY/giphy.gif'},
    {name: 'Lo Alto del Dinero', author: "Milton Cordoba", img: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3anp6a29nYWhpdjJuMDl1N2p2bXRxZTYxYmFhZmg3azZrYTgwYW8yMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3orifapbT0z7sG2W7m/giphy.gif'},
    {name: 'Nada como la Privacidad del Hogar', author: "Milton Cordoba", img: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MXgwMzMxcm1sd3E4bHcwY2tldG40dGNmaGl4enhoZ211cnFuMmx0YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cs9PJTxvSO4T6UQ0aa/giphy.gif'},
    {name: 'Moverse en la Cuidad', author: "Milton Cordoba", img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3IxcXlwNmZtdzhkY2J4aTJmOWQ0Z25veXdsdjR5MHFlbDZmZ2hneiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Dumy6VxTrZfS8/giphy.gif'},
    {name: 'Diversión de Otro Planeta', author: "Milton Cordoba", img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnNxem9wN292bXJhYm03aHFzdzJxeHkyMGo2ejhwamxxc2VtY2JoMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/89IpbLNkeETdu/giphy.gif'},
    {name: 'Espectáculo de la Galaxia', author: "Milton Cordoba", img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHZkbHRybGVubDZhOXlsc2R1NHFmOHVyMTA4dDMwbWZ6YWtyNGx1ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3og0IFrHkIglEOg8Ba/giphy.gif'},
    {name: 'Taxistas', author: "Milton Cordoba" , img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3E3ZG4zNTF5bDh6Mnhsam9vZWs5MTRtajRtMWE2OHVid3k5bGhqMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SLr8qaoRH6Hmw/giphy.gif'},
  ]

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={'/home'} replace />} />
        <Route path='/home' element={<Home galleryList={galleryList}/>}></Route>
        <Route path='/art/:id' element={<ArtPiece galleryList={galleryList}/>}></Route>
        <Route path='*' element={<Navigate to={'/home'} replace />} />
      </Routes>
    </>
  )
}

export default App

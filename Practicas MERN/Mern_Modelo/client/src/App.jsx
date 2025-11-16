
import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Registro from "./views/Registro";
import NotFound from "./components/NotFound";
import Login from "./views/Login";
import Header from "./components/Header";
import ForosApi from "./views/ForosApi";
import Peliculas from "./views/Peliculas";
import NuevaPelicula from "./views/NuevaPelicula";
import PeliculaDetalle from "./views/PeliculaDetalle";
import EditarPelicula from "./views/EditarPelicula";


function App() {
  const [listaForos, setListaForos] = useState([]);
  const [listaPeliculas, setListaPeliculas] = useState([]);
  
  const [login, setLogin] = useState(false);
  const [me, setMe] = useState({});
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/login");
  };

  return (
    <>
      <Header login={login} logOut={logOut} />
      <Routes>
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route path="/registro" element={<Registro setLogin={setLogin} />} />
        <Route path="/foros" element={<ForosApi setListaForos={setListaForos} setLogin={setLogin} setMe={setMe} listaForos={listaForos} />} />
        <Route path="/peliculas/nueva" element={<NuevaPelicula listaPeliculas={listaPeliculas} setListaPeliculas={setListaPeliculas} />} />
        <Route path="/peliculas/:id" element={<PeliculaDetalle setLogin={setLogin} />} />
        <Route path="/peliculas/:id/edit" element={<EditarPelicula setListaPeliculas={setListaPeliculas} />} />
        <Route path="/peliculas" element={<Peliculas listaPeliculas={listaPeliculas} setListaPeliculas={setListaPeliculas} setLogin={setLogin} setMe={setMe} />} />
        <Route path="/" element={<Peliculas listaPeliculas={listaPeliculas} setListaPeliculas={setListaPeliculas} setLogin={setLogin} setMe={setMe} />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

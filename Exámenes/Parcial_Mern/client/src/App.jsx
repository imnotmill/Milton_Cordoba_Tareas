
import { useState, useEffect } from "react";
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Registro from "./views/Registro";
import NotFound from "./components/NotFound";
import Login from "./views/Login";
import Header from "./components/Header";
import ForosApi from "./views/ForosApi";
import Destinos from "./views/Destinos";
import AgregarDestino from "./views/AgregarDestino";
import DestinoDetalle from "./views/DestinoDetalle";
import EditarDestino from "./views/EditarDestino";


function App() {
  const [listaForos, setListaForos] = useState([]);
  const [listaPeliculas, setListaPeliculas] = useState([]);
  
  const [login, setLogin] = useState(false);
  const [me, setMe] = useState({});
  const navigate = useNavigate();
  
  function decodeJwt(token) {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const payload = decodeJwt(token);
    const now = Math.floor(Date.now() / 1000);
    if (!payload || (payload.exp && payload.exp < now)) {
      localStorage.removeItem('token');
      setLogin(false);
      navigate('/login');
      return;
    }
    axios.defaults.headers.common['token_user'] = token;
    setLogin(true);
    setMe(payload);
  }, []);
  const logOut = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['token_user'];
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
        <Route path="/destinos/nuevo" element={<AgregarDestino listaPeliculas={listaPeliculas} setListaPeliculas={setListaPeliculas} />} />
        <Route path="/destinos/:id" element={<DestinoDetalle setLogin={setLogin} />} />
        <Route path="/destinos/:id/edit" element={<EditarDestino setListaPeliculas={setListaPeliculas} />} />
        <Route path="/destinos" element={<Destinos listaPeliculas={listaPeliculas} setListaPeliculas={setListaPeliculas} setLogin={setLogin} setMe={setMe} />} />
        <Route path="/" element={<Destinos listaPeliculas={listaPeliculas} setListaPeliculas={setListaPeliculas} setLogin={setLogin} setMe={setMe} />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

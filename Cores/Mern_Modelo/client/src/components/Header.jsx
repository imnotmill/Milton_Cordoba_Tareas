import { Link } from "react-router-dom";
import style from "./../css/Header.module.css";


const Header = ({ login, logOut }) => {
  return (
    <header className={style.header}>
      <h1 className={style.title}>Películas</h1>
      <nav className={style.navlinks}>
        {login ? (
          <>
            <Link to="/">Todas las películas</Link>
            <Link to="/peliculas/nueva">Agregar película</Link>
            <button onClick={logOut} style={{ background: 'none', border: 'none', color: '#222', fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer', marginLeft: '1.5rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/registro">Registro</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

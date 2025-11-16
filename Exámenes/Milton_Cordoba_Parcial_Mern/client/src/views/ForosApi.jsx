import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../css/ForosApi.module.css';

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


const ForosApi = ({ listaForos, setListaForos, setLogin, setMe }) => {
    const navigate = useNavigate();
    const user = localStorage.getItem("token") ? decodeJwt(localStorage.getItem("token")) : null;

    const getData = () => {
        const URL = "http://localhost:8000/api/foros";
        axios(URL, { headers: { token_user: localStorage.getItem("token") } })
            .then(response => {
                setListaForos(response.data)
                setLogin(true)
                setMe(decodeJwt(localStorage.getItem("token")))
            })
            .catch(e => {
                navigate("/login")
                setLogin(false)
            })
    }

    const handleEliminar = (id) => {
        axios.delete(`http://localhost:8000/api/foros/${id}`, { headers: { token_user: localStorage.getItem("token") } })
            .then(() => {
                setListaForos(listaForos.filter(f => f._id !== id));
                navigate("/foros");
            })
            .catch(() => {
                navigate("/login");
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles["foro-container"]}>
            <div className={styles["foro-header"]}>
            </div>
            <div className={styles["foro-bienvenida"]}>
                {user && `Bienvenido de vuelta ${user.name || user.firstname || user.email || "Usuario"}`}
            </div>
            <div className={styles["foro-grid"]} style={{ maxWidth: '900px', margin: '0 auto' }}>
                {Array.isArray(listaForos) && listaForos.map((foro, index) => (
                    <div className={styles["foro-card"]} key={foro._id || index} style={{ width: '100%', maxWidth: '600px', minWidth: '400px', margin: '0 auto' }}>
                        <img className={styles["foro-img"]} src={foro.img || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='170'><rect width='100%25' height='100%25' fill='%23ddd'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='14'>Foro</text></svg>"} alt={foro.title} />
                        <div className={styles["foro-title"]}>{foro.title}</div>
                        <div>{foro.description}</div>
                        <div className={styles["foro-btns"]}>
                            <Link to={`/foros/${foro._id}`}> <button className={styles["foro-btn-detalle"]}>Detalle</button> </Link>
                            <button className={styles["foro-btn-eliminar"]} onClick={() => handleEliminar(foro._id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForosApi;
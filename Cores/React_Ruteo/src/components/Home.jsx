import { Link } from "react-router-dom"
import style from './../css/home.module.css'

const Home = ({galleryList}) => {
    return (
        <>
        <h1>¡Bienvenido a la Galería de Arte Futurista!</h1>
        <ul>
                {galleryList.map((art, index) => <li key={index} className={style.list}><Link to={`/art/${index}`}>{art.name}</Link></li>)}
            </ul>
        </>
    )
}

export default Home;
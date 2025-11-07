import { useParams, useNavigate, Navigate } from "react-router-dom";
import style from "./../css/artpiece.module.css";

const ArtPiece = ({ galleryList }) => {
    const navigate = useNavigate();
    const params = useParams();
    const idParams = Number(params.id);

    if (Number.isNaN(idParams) || idParams < 0 || idParams >= galleryList.length) {
        return <Navigate to="/home" replace />;
    }

    const art = galleryList[idParams];

    return (
        <>
            <h1>{art.name}</h1>
            <br />
            <img src={art.img} alt={art.name} />
            <div>
                <button className={`${style.btns} btn btn-success`} onClick={() => navigate(idParams > 0 ? `/art/${idParams - 1}` : "/home")} disabled={idParams === 0}>Anterior</button>
                <button className={`${style.btns} btn btn-success`} onClick={() => navigate("/home")}>Inicio</button>
                <button className={`${style.btns} btn btn-success`} onClick={() => navigate(idParams < galleryList.length - 1 ? `/art/${idParams + 1}` : "/home")} disabled={idParams === galleryList.length - 1}>Siguiente</button>
            </div>
        </>
    );
};

export default ArtPiece;
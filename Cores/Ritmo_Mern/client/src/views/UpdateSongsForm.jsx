import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const UpdateSongsForm = ({listaSongs, setListasSongs})=> {
    const emptyDefault = {title: "", artist: "", yearOfRealease: "", genre: ""}
    const navigate = useNavigate();
    const {id} = useParams();

    const index = listaSongs.findIndex((song)=> song._id==id)

    const [data, setData] = useState({...emptyDefault})
    const [errors, setErrors] = useState({})

    const updadatState = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }


    // Validaciones frontend según el modelo de Mongoose
    const validate = (values) => {
        const errs = {};
        // title
        if (!values.title || values.title.trim() === "") {
            errs.title = "El título es obligatorio.";
        } else if (values.title.length < 6) {
            errs.title = "El título debe tener al menos 6 caracteres.";
        } else if (values.title.length > 255) {
            errs.title = "El título es demasiado largo.";
        }
        // artist
        if (!values.artist || values.artist.trim() === "") {
            errs.artist = "El artista es obligatorio.";
        } else if (values.artist.length < 10) {
            errs.artist = "El nombre del artista debe tener al menos 10 caracteres.";
        } else if (values.artist.length > 255) {
            errs.artist = "El nombre del artista es demasiado largo.";
        }
        // yearOfRealease
        if (!values.yearOfRealease) {
            errs.yearOfRealease = "El año de lanzamiento es obligatorio.";
        } else if (isNaN(Number(values.yearOfRealease))) {
            errs.yearOfRealease = "El año debe ser un número válido.";
        } else if (Number(values.yearOfRealease) < 1900) {
            errs.yearOfRealease = "El año no puede ser menor a 1900.";
        } else if (Number(values.yearOfRealease) > 2025) {
            errs.yearOfRealease = "El año no puede ser mayor a 2025.";
        }
        // genre
        if (!values.genre || values.genre.trim() === "") {
            errs.genre = "El género es obligatorio.";
        }
        return errs;
    };

    const updateSong = (e) => {
        e.preventDefault();
        const frontendErrors = validate(data);
        if (Object.keys(frontendErrors).length > 0) {
            setErrors(frontendErrors);
            return;
        }
        setErrors({});
        const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const URL = `${API}/api/canciones/${id}`;
        axios.put(URL, data, { headers: { token_user: localStorage.getItem("token") } })
            .then(response => {
                const copyListaSong = [...listaSongs];
                copyListaSong[index] = response.data;
                setListasSongs(copyListaSong);
                navigate(`/canciones/${id}`);
            })
            .catch(e => {
                // Si el backend responde con errores de validación
                if (e.response && e.response.data && e.response.data.errors) {
                    setErrors(e.response.data.errors);
                } else if (e.response && e.response.data && e.response.data.message) {
                    setErrors({ general: e.response.data.message });
                } else {
                    setErrors({ general: "Error inesperado al actualizar la canción." });
                }
            });
    };


    useEffect(()=>{
        const newArray = listaSongs.find((song)=> song._id==id)
        setData(newArray ? {...newArray} : {...emptyDefault})
    },[listaSongs,id])

    return (
        <form onSubmit={updateSong}>
            {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
            <div>
                <label htmlFor="title">Título:</label>
                <input type="text" name="title" id="title" value={data.title} onChange={updadatState} />
                {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="artist">Artista:</label>
                <input type="text" name="artist" id="artist" value={data.artist} onChange={updadatState} />
                {errors.artist && <p style={{ color: "red" }}>{errors.artist}</p>}
            </div>
            <div>
                <label htmlFor="yearOfRealease">Lanzamiento:</label>
                <input type="text" name="yearOfRealease" id="yearOfRealease" value={data.yearOfRealease} onChange={updadatState} />
                {errors.yearOfRealease && <p style={{ color: "red" }}>{errors.yearOfRealease}</p>}
            </div>
            <div>
                <label htmlFor="genre">Género:</label>
                <input type="text" name="genre" id="genre" value={data.genre} onChange={updadatState} />
                {errors.genre && <p style={{ color: "red" }}>{errors.genre}</p>}
            </div>
            <button>Enviar</button>
        </form>
    );
}


export default UpdateSongsForm;
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormSongs = ({listaSongs, setListasSongs})=>{
    const [data, setData] = useState({
        title : "",
        artist : "",
        yearOfRealease : 0,
        genre : ""
    })
    const [errors, setErrors] = useState(
        {

        }
    )

    const navigate = useNavigate();

    const updadatState = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }


    const addSong = (e) =>{
        e.preventDefault();
        const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const URL = `${API}/api/canciones`;
            // xxxxx Espacio para validations xxxx

        axios.post(URL,data).then(
            response => {
                setListasSongs([...listaSongs, response.data])
                navigate('/canciones')
            }

        ).catch(
            e=> 
                setErrors(e.response.data.errors)

        )
    }

    return(
        <form className="form" onSubmit={(e) =>addSong(e) }>
            <h1 className="page-title">New Song</h1>
            <div className="field">
                <label htmlFor="title" >Title:</label>
                <input className="input" type="text" name="title" id="title" value={data.title} onChange={(e)=>{ updadatState(e)}} />
                {errors.title  && <p className="error-text">{errors.title}</p>}
            </div>
            <div className="field">
                <label htmlFor="artist" >Artist:</label>
                <input className="input" type="text" name="artist" id="artist" value={data.artist}  onChange={(e)=>{ updadatState(e)}}/>
                {errors.artist  && <p className="error-text">{errors.artist}</p>}
            </div>
            <div className="field">
                <label htmlFor="yearOfRealease" >Year:</label>
                <input className="input" type="text" name="yearOfRealease" id="yearOfRealease" value={data.yearOfRealease}  onChange={(e)=>{ updadatState(e)}}/>
                {errors.yearOfRealease  && <p className="error-text">{errors.yearOfRealease}</p>}
            </div>
            <div className="field">
                <label htmlFor="genre" >Genre:</label>
                <input className="input" type="text" name="genre" id="genre"  value={data.genre}  onChange={(e)=>{ updadatState(e)}}/>
                {errors.genre  && <p className="error-text">{errors.genre}</p>}
            </div>
            <button className="btn primary">Add Song</button>
        </form>
    )
}

export default FormSongs;
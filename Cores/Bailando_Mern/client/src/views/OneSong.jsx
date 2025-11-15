import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";


const OneSong = ({listaSongs, setListasSongs})=> {
    const [person, setPerson] = useState({})
    const [error, setError] = useState('')
    const {id} = useParams();
    const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    const URL = `${API}/api/canciones/${id}`
    const navigate = useNavigate();
    const getData = ()=>{
        axios(URL, {headers : {token_user : localStorage.getItem("token")}}).then(response => 
            setPerson(response.data)
        ).catch(
            e=> setError(e)
        )
    }

    useEffect(()=>{
        getData()
    },[])

    if(error){
        return <NotFound/>
    }


    const deleteOne =()=>{
        axios.delete(URL, {headers : {token_user : localStorage.getItem("token")}}).then(
            response => {

                setListasSongs(listaSongs.filter(song => song._id != id ))
                navigate('/canciones')
            } 
        ).catch(
            e => console.log(e)
        )
    }

    const updateSong = ()=>{
        navigate(`/canciones/update/${id}`)
    }

    return(
        <div className="page">
            <h2 className="page-title">Song Details</h2>
            <p><strong>Title:</strong> {person.title}</p>
            <p><strong>Artist:</strong> {person.artist}</p>
            <p><strong>Year:</strong> {person.yearOfRealease}</p>
            <p><strong>Genre:</strong> {person.genre}</p>
            <div className="actions">
              <button className="btn danger" onClick={deleteOne}>Delete</button>
              <button className="btn" onClick={updateSong}>Edit</button>
            </div>
        </div>
    )
}

export default OneSong;
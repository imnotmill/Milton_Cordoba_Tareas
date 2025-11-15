import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setLogin}) =>{
    const [state, setState] = useState({
        email : '',
        password : ''
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const updateState = (e)=>{
        setState({...state, [e.target.name] : e.target.value})
    }


    const loginProcess = (e)=>{
        e.preventDefault();
        const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const URL= `${API}/api/users/login`;
        axios.post(URL,state).then(
            // defintion of the token in localstorage
            response => {
                localStorage.setItem("token", response.data.token)
                setLogin(true)
                setErrors({})
                navigate('/canciones')
            }
        ).catch(e=> setErrors(e?.response?.data?.errors || {general: 'Error de conexión'}))
    }

    return (
        <form className="form" onSubmit={e => loginProcess(e)}>
            <h1 className="page-title">Login</h1>
            <div className="field">
                <label htmlFor="email">Email:</label>
                <input className="input" type="email" name="email" id="email" value={state.email} onChange={(e)=> updateState(e)}/>
                {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="field">
                <label htmlFor="password">Password:</label>
                <input className="input" type="password" name="password" id="password" value={state.password} onChange={(e)=> updateState(e)}/>
                {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            <div style={{textAlign:'center', marginTop: 16}}>
                <button className="btn primary">Log in</button>
            </div>
            {errors.general && <p className="error-text" style={{textAlign:'center', marginTop:12}}>{errors.general}</p>}
        </form>
    )
}


export default Login;
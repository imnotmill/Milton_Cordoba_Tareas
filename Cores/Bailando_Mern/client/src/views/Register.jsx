import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({setLogin}) =>{
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState('')

    const navigate = useNavigate();

    const updateState = (e)=>{
        setState({...state, [e.target.name] : e.target.value})
    }

    const registerProcess = (e)=>{
        e.preventDefault();
        const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const URL= `${API}/api/users/new`;
        axios.post(URL, state).then(
            response => {
                localStorage.setItem("token", response.data.token)
                setLogin(true)
                setErrors({})
                setSuccess('Usuario registrado exitosamente')
                setTimeout(()=> navigate('/canciones'), 1500)
            }
        ).catch(e=> {
            setErrors(e?.response?.data?.errors || {general: 'Error de conexión'})
            setSuccess('')
        })
    }

    return (
        <form className="form" onSubmit={e => registerProcess(e)}>
            <h1 className="page-title">Register</h1>
            
            <div className="field">
                <label htmlFor="firstname">First Name:</label>
                <input className="input" type="text" name="firstname" id="firstname" value={state.firstname} onChange={(e)=> updateState(e)}/>
                {errors.firstname && <p className="error-text">{errors.firstname}</p>}
            </div>

            <div className="field">
                <label htmlFor="lastname">Last Name:</label>
                <input className="input" type="text" name="lastname" id="lastname" value={state.lastname} onChange={(e)=> updateState(e)}/>
                {errors.lastname && <p className="error-text">{errors.lastname}</p>}
            </div>

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

            <div className="field">
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input className="input" type="password" name="passwordConfirm" id="passwordConfirm" value={state.passwordConfirm} onChange={(e)=> updateState(e)}/>
                {errors.passwordConfirm && <p className="error-text">{errors.passwordConfirm}</p>}
            </div>

            <div style={{textAlign:'center', marginTop: 16}}>
                <button className="btn primary">Register</button>
            </div>
            
            {success && <p style={{color: '#22c55e', textAlign:'center', marginTop:12, fontWeight:600}}>{success}</p>}
            {errors.general && <p className="error-text" style={{textAlign:'center', marginTop:12}}>{errors.general}</p>}
        </form>
    )
}

export default Register;

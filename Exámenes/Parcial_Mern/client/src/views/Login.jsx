import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from '../css/Registro.module.css';

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

    const validate = () => {
        const newErrors = {};
        if (!state.email) newErrors.email = 'Por favor ingresa un correo';
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.email)) newErrors.email = 'Correo inválido';

        if (!state.password) newErrors.password = 'Por favor ingresa tu contraseña';
        else if (state.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';

        return newErrors;
    }


    const loginProcess = (e)=>{
        e.preventDefault();
        const newErrors = validate();
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const URL= `${API}/api/users/login`;
        axios.post(URL,state).then(
            response => {
                const token = response.data.token;
                localStorage.setItem("token", token)
                axios.defaults.headers.common['token_user'] = token;
                setLogin(true)
                setErrors({})
                navigate('/destinos')
            }
        ).catch(e=> setErrors(e?.response?.data?.errors || {general: 'Error de conexión'}))
    }

    return (
        <div className={styles['registro-full']}>
            
            <form onSubmit={loginProcess} className={styles['registro-form-full']} style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 32px #0002', padding: '1.2rem', width: '100%' }}>
                <h2 style={{ fontWeight: 600, fontSize: '2.7rem', marginBottom: '1.7rem', textAlign: 'center' }}>Login</h2>
                <div>
                    <input type="email" name="email" placeholder="Correo" value={state.email} onChange={updateState} style={{ width: '100%' }} />
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                </div>
                <div>
                    <input type="password" name="password" placeholder="Contraseña" value={state.password} onChange={updateState} style={{ width: '100%' }} />
                    {errors.password && <div className={styles.error}>{errors.password}</div>}
                </div>
                {errors.general && <div className={styles.error}>{errors.general}</div>}
                <button type="submit" style={{ width: '100%', marginTop: '1.5rem', fontSize: '1.1rem' }}>Log in</button>
            </form>
        </div>
    )
}


export default Login;
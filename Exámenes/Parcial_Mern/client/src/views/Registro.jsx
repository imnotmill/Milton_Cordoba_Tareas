
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from '../css/Registro.module.css';

const Registro = ({ setLogin }) => {
    const [state, setState] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        repetirPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const updateState = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        
        if (!state.nombre) newErrors.nombre = 'Por favor proporciona tu nombre';
        else if (state.nombre.length < 3) newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
        
        if (!state.apellido) newErrors.apellido = 'Por favor proporciona tu apellido';
        else if (state.apellido.length < 3) newErrors.apellido = 'El apellido debe tener al menos 3 caracteres';
        
        if (!state.email) newErrors.email = 'Por favor ingresa un correo válido';
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.email)) newErrors.email = 'Correo inválido';
        
        if (!state.password) newErrors.password = 'La contraseña es obligatoria';
        else if (state.password.length < 8) newErrors.password = 'La contraseña necesita tener al menos 8 caracteres';
        
        if (!state.repetirPassword) newErrors.repetirPassword = 'Por favor repite la contraseña';
        else if (state.password !== state.repetirPassword) newErrors.repetirPassword = 'Las contraseñas no coinciden';
        return newErrors;
    };

    const registerProcess = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const URL = `${API}/api/users/new`;
        const mappedState = {
            firstname: state.nombre,
            lastname: state.apellido,
            email: state.email,
            password: state.password,
            passwordConfirm: state.repetirPassword
        };
        axios.post(URL, mappedState)
            .then((response) => {
                if (response?.data?.token) {
                    localStorage.setItem('token', response.data.token);
                }
                setErrors({});
                if (setLogin) setLogin(true);
                navigate('/destinos');
            })
            .catch(e => setErrors(e?.response?.data?.errors || { general: 'Error de conexión' }));
    };

        return (
            <div className={styles['registro-full']}>
                
                <form onSubmit={registerProcess} className={styles['registro-form-full']} style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 32px #0002', padding: '1.2rem', width: '100%' }}>
                    <h2 style={{ fontWeight: 600, fontSize: '2.7rem', marginBottom: '1.7rem', textAlign: 'center' }}>Registro</h2>
                    <div>
                        <input type="text" name="nombre" placeholder="Nombre" value={state.nombre} onChange={updateState} style={{ width: '100%' }} />
                        {errors.nombre && <div className={styles.error}>{errors.nombre}</div>}
                    </div>
                    <div>
                        <input type="text" name="apellido" placeholder="Apellido" value={state.apellido} onChange={updateState} style={{ width: '100%' }} />
                        {errors.apellido && <div className={styles.error}>{errors.apellido}</div>}
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="Correo" value={state.email} onChange={updateState} style={{ width: '100%' }} />
                        {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Contraseña" value={state.password} onChange={updateState} style={{ width: '100%' }} />
                        {errors.password && <div className={styles.error}>{errors.password}</div>}
                    </div>
                    <div>
                        <input type="password" name="repetirPassword" placeholder="Confirmar contraseña" value={state.repetirPassword} onChange={updateState} style={{ width: '100%' }} />
                        {errors.repetirPassword && <div className={styles.error}>{errors.repetirPassword}</div>}
                    </div>
                    {errors.general && <div className={styles.error}>{errors.general}</div>}
                    <button type="submit" style={{ width: '100%', marginTop: '1.5rem', fontSize: '1.1rem' }}>Registrarse</button>
                </form>
            </div>
        );
};

export default Registro;
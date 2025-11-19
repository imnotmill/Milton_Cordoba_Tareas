import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../components/AuthProvider'

const Login = () => {
  const [form, setForm] = useState({ correo: '', contraseña: '' })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { loginWithToken } = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors(null)

    try {
      const res = await axios.post('/usuarios/login', form)
      const data = res.data
      if (data?.token) {
        // almacenar token y notificar al AuthProvider
        loginWithToken(data.token)
        navigate('/')
      }
    } catch (err) {
      const payload = err.response?.data || { mensaje: err.message }
      setErrors(payload)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div>
          <label>Correo</label>
          <input name="correo" type="email" value={form.correo} onChange={handleChange} />
        </div>
        <div>
          <label>Contraseña</label>
          <input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} />
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
        </div>
      </form>

      {errors && (
        <div style={{ marginTop: 12, color: 'red' }}>
          <strong>{errors.mensaje || 'Error'}</strong>
          {errors.errores && (
            <ul>
              {Object.keys(errors.errores).map(k => (
                errors.errores[k] && <li key={k}>{errors.errores[k]}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Login

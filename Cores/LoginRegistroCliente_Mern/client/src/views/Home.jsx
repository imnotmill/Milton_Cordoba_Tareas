import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthProvider'

const Home = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Sección principal</h1>
      {user && (
        <div style={{ marginTop: 8 }}>
          <strong>Usuario:</strong> {user.correo || user.email || user.nombre || JSON.stringify(user)}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  )
}

export default Home

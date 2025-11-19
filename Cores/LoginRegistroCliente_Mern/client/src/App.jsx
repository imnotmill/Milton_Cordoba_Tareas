import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './components/AuthProvider'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <nav style={{ padding: 12 }}>
        <Link to="/">Inicio</Link>
        {' | '}
        <Link to="/login">Login</Link>
        {' | '}
        <Link to="/registro">Registro</Link>
      </nav>

      <Routes>
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App

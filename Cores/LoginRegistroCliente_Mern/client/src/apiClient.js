import axios from 'axios'

const API_BASE = 'http://localhost:8000/api'

// Configurar axios globalmente (para que `import axios from 'axios'` funcione)
axios.defaults.baseURL = API_BASE
axios.defaults.withCredentials = true

// Añadir token en headers si existe
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token_usuario')
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token}`
    config.headers['token_usuario'] = token
  }
  return config
})

// Manejar 401/403: limpiar token y forzar login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401 || status === 403) {
      try { localStorage.removeItem('token_usuario') } catch (e) {}
      // redirigir al login
      if (typeof window !== 'undefined') window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axios

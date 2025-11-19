import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

// Contexto y proveedor de autenticación
const AuthContext = createContext(null)

function decodeJwt(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decodeURIComponent(escape(decoded)))
  } catch (e) {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadFromToken = useCallback(() => {
    const token = localStorage.getItem('token_usuario')
    if (!token) {
      setUser(null)
      setLoading(false)
      return null
    }

    const payload = decodeJwt(token)
    if (!payload) {
      localStorage.removeItem('token_usuario')
      setUser(null)
      setLoading(false)
      return null
    }

    // comprobar expiración
    if (payload.exp && Math.floor(Date.now() / 1000) >= payload.exp) {
      localStorage.removeItem('token_usuario')
      setUser(null)
      setLoading(false)
      return null
    }

    const u = payload.usuario || payload.user || payload
    setUser(u)
    setLoading(false)

    // programar logout cuando expire
    if (payload.exp) {
      const now = Math.floor(Date.now() / 1000)
      const msUntil = (payload.exp - now) * 1000
      if (msUntil > 0) {
        setTimeout(() => {
          localStorage.removeItem('token_usuario')
          setUser(null)
        }, msUntil)
      }
    }

    return u
  }, [])

  useEffect(() => {
    loadFromToken()
  }, [loadFromToken])

  const loginWithToken = (token) => {
    if (!token) return
    localStorage.setItem('token_usuario', token)
    loadFromToken()
  }

  const logout = () => {
    localStorage.removeItem('token_usuario')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthProvider

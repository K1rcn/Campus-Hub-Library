import React, { createContext, useContext, useState, useEffect } from 'react'
import localStore from '../services/localStore'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('campus_auth_user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (username, password) => {
    const res = localStore.authenticateUser(username, password)
    if (!res.ok) return res

    // ✅ FIX: store full user object
    setUser(res.user)
    localStorage.setItem('campus_auth_user', JSON.stringify(res.user))

    return { ok: true }
  }

  const register = (data) => {
    const res = localStore.createUser(data)
    if (!res.ok) return res

    // auto-login new user
    setUser(res.user)
    localStorage.setItem('campus_auth_user', JSON.stringify(res.user))

    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('campus_auth_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

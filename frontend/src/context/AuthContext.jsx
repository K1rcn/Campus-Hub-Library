import React, { createContext, useContext, useState, useEffect } from 'react'
import localStore from '../services/localStore'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('campus_user')) }catch(e){ return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem('campus_user', JSON.stringify(user))
    else localStorage.removeItem('campus_user')
  }, [user])

  function register({ username, password, name, role }){
    const res = localStore.createUser({ username, password, name, role })
    if (!res.ok) return res
    // Automatically sign in the newly registered user
    const newUser = { id: res.user.id, username: res.user.username, name: res.user.name, role: res.user.role }
    setUser(newUser)
    return { ok:true, user: res.user }
  }

  function login(username, password){
    const res = localStore.authenticateUser(username, password)
    if (!res.ok) return res
    setUser({ id: res.user.id, username: res.user.username, name: res.user.name, role: res.user.role })
    return { ok:true, user: res.user }
  }

  function logout(){ setUser(null) }

  function updateProfile(updates){
    if (!user) return { ok:false, msg: 'Not authenticated' }
    const res = localStore.updateUser(user.id, updates)
    if (!res.ok) return res
    const updated = { ...user, ...res.user }
    setUser(updated)
    return { ok:true, user: updated }
  }

  function changePassword(newPassword){
    if (!user) return { ok:false, msg: 'Not authenticated' }
    const res = localStore.changePassword(user.id, newPassword)
    return res
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){ return useContext(AuthContext) }

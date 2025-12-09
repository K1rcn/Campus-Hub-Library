import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requiredRole=null }){
  const auth = useAuth()
  if (!auth || !auth.user) return <Navigate to="/login" replace />
  if (requiredRole && auth.user.role !== requiredRole) return <Navigate to="/" replace />
  return children
}

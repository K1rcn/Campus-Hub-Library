import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import CreateEvent from './pages/CreateEvent'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'
import AdminBooks from './pages/AdminBooks'
import Borrowings from './pages/Borrowings'
import AdminDashboard from './pages/AdminDashboard'
import AdminImportBooks from './pages/AdminImportBooks'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Profile from './pages/Profile'
import UsersManagement from './pages/UsersManagement'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import { theme } from './theme/theme'
import localStore from './services/localStore'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'

function Home(){
  const auth = useAuth()
  if (auth?.user) {
    if (auth.user.role === 'admin') return <Navigate to="/admin-dashboard" replace />
    if (auth.user.role === 'teacher') return <Navigate to="/teacher-dashboard" replace />
    return <Navigate to="/student-dashboard" replace />
  }
  return <Navigate to="/login" replace />
}

function AppRoutes(){
  const ds = localStore.listBooks ? localStore.listBooks({ page: 1, perPage: 1 }) : { items: [] }
  const totalBooks = ds && typeof ds.total === 'number' ? ds.total : (ds.items ? ds.items.length : 0)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/borrowings" element={<ProtectedRoute><Borrowings /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute requiredRole="admin"><UsersManagement /></ProtectedRoute>} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminBooks /></ProtectedRoute>} />
        <Route path="/admin/import" element={<ProtectedRoute requiredRole="admin"><AdminImportBooks /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/teacher-dashboard" element={<ProtectedRoute requiredRole="teacher"><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/student-dashboard" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

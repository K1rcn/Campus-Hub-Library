import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
  const auth = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const roleColor = { admin: '#d32f2f', teacher: '#f57c00', student: '#388e3c' }
  const roleDisplay = { admin: 'Admin', teacher: 'Teacher', student: 'Student' }

  function getDashboard(){
    if (!auth?.user) return '/'
    if (auth.user.role === 'admin') return '/admin-dashboard'
    if (auth.user.role === 'teacher') return '/teacher-dashboard'
    return '/student-dashboard'
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  function handleLogout() {
    auth.logout()
    handleMenuClose()
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }} onClick={() => navigate(getDashboard())} style={{ cursor: 'pointer' }}>
            Campus Hub Library
          </Typography>
          
          {auth?.user && (
            <>
              <Button color="inherit" component={RouterLink} to="/books" sx={{ mx: 1 }}>Books</Button>
              <Button color="inherit" component={RouterLink} to="/borrowings" sx={{ mx: 1 }}>My Borrowings</Button>
              {auth.user.role === 'admin' && (
                <>
                  <Button color="inherit" component={RouterLink} to="/admin" sx={{ mx: 1 }}>Manage Books</Button>
                  <Button color="inherit" component={RouterLink} to="/admin/import" sx={{ mx: 1 }}>Import CSV</Button>
                  <Button color="inherit" component={RouterLink} to="/users" sx={{ mx: 1 }}>Users</Button>
                </>
              )}
            </>
          )}

          {auth && auth.user ? (
            <>
              <Chip label={roleDisplay[auth.user?.role] || 'User'} sx={{ mr: 2, backgroundColor: roleColor[auth.user?.role] || '#607d8b', color: 'white' }} />
              <Avatar sx={{ cursor: 'pointer', mr: 2, bgcolor: roleColor[auth.user?.role] || '#607d8b' }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                {(auth.user?.name || auth.user?.username || '?').charAt(0).toUpperCase()}
              </Avatar>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem disabled>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{auth.user.name}</Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>@{auth.user.username}</MenuItem>
                <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>My Profile</MenuItem>
                <MenuItem component={RouterLink} to={getDashboard()} onClick={handleMenuClose}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login" sx={{ mx: 1 }}>Login</Button>
              <Button variant="outlined" color="inherit" component={RouterLink} to="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

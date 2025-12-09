import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'

export default function Profile(){
  const { user, updateProfile, changePassword } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')

  if (!user) return <Typography>Please log in to view profile</Typography>

  function handleUpdateProfile(e) {
    e.preventDefault()
    if (typeof updateProfile === 'function'){
      const res = updateProfile({ name, email })
      if (res && !res.ok){
        setMsg(res.msg || 'Update failed')
        setMsgType('error')
        return
      }
    }
    setMsg('Profile updated successfully!')
    setMsgType('success')
  }

  function handleChangePassword(e) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMsg('Passwords do not match')
      setMsgType('error')
      return
    }
    if (newPassword.length < 6) {
      setMsg('Password must be at least 6 characters')
      setMsgType('error')
      return
    }
    if (typeof changePassword === 'function'){
      const res = changePassword(newPassword)
      if (res && !res.ok){
        setMsg(res.msg || 'Password change failed')
        setMsgType('error')
        return
      }
    }
    setMsg('Password changed successfully!')
    setMsgType('success')
    setNewPassword('')
    setConfirmPassword('')
  }

  const roleColors = { admin: '#d32f2f', teacher: '#f57c00', student: '#388e3c' }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: '0 auto 16px',
                  bgcolor: roleColors[user.role],
                  fontSize: '2.5rem'
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                @{user.username}
              </Typography>
              <Chip
                label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                sx={{
                  bgcolor: roleColors[user.role],
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                <Typography variant="caption" display="block" color="textSecondary">
                  User ID: {user.id}
                </Typography>
                <Typography variant="caption" display="block" color="textSecondary">
                  Member since: Dec 2025
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Profile Forms */}
        <Grid item xs={12} md={8}>
          {msg && (
            <Alert severity={msgType} sx={{ mb: 3 }} onClose={() => setMsg('')}>
              {msg}
            </Alert>
          )}

          {/* Update Profile */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Update Profile
            </Typography>
            <form onSubmit={handleUpdateProfile}>
              <TextField
                label="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
              >
                Save Changes
              </Button>
            </form>
          </Paper>

          {/* Change Password */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Change Password
            </Typography>
            <form onSubmit={handleChangePassword}>
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                helperText="At least 6 characters"
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
              >
                Update Password
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

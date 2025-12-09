import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'

export default function Register(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('student')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    
    if (!username || !password || !name) {
      setMsg('Please fill in all fields')
      setMsgType('error')
      return
    }
    
    if (password !== confirmPassword) {
      setMsg('Passwords do not match')
      setMsgType('error')
      return
    }
    
    if (password.length < 6) {
      setMsg('Password must be at least 6 characters')
      setMsgType('error')
      return
    }

    const res = auth.register({ username, password, name, role })
    if (!res.ok) {
      setMsg(res.msg || 'Registration failed')
      setMsgType('error')
    } else {
      setMsg('Registration successful! Redirecting...')
      setMsgType('success')
      // clear local form fields
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setName('')
      // AuthProvider.register already sets the user; just navigate to home/dashboard
      setTimeout(() => navigate('/'), 800)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
          Campus Hub
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
          Create Your Account
        </Typography>

        {msg && (
          <Alert severity={msgType} sx={{ mb: 3 }} onClose={() => setMsg('')}>
            {msg}
          </Alert>
        )}

        <form onSubmit={submit}>
          <TextField
            label="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          
          <TextField
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
            helperText="Choose a unique username"
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
            helperText="At least 6 characters"
          />

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select value={role} label="Role" onChange={e => setRole(e.target.value)}>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              {/* Admin accounts are restricted. Contact an existing admin to create admin users. */}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            size="large"
            sx={{ mb: 3 }}
          >
            Register
          </Button>
        </form>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Already have an account? <Link href="/login" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Login here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

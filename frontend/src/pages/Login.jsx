import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    const res = auth.login(username, password)
    if (!res.ok) {
      setMsg(res.msg || 'Login failed')
      setMsgType('error')
    } else {
      setMsg('Logged in successfully!')
      setMsgType('success')
      setUsername('')
      setPassword('')
      setTimeout(() => navigate('/'), 1000)
    }
  }

  // Demo accounts removed for production look-and-feel

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
          Campus Hub
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
          Library Management System
        </Typography>

        {msg && (
          <Alert severity={msgType} sx={{ mb: 3 }} onClose={() => setMsg('')}>
            {msg}
          </Alert>
        )}

        <form onSubmit={submit}>
          <TextField
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          
          <Button
            variant="contained"
            type="submit"
            fullWidth
            size="large"
            sx={{ mb: 3 }}
          >
            Login
          </Button>
        </form>

        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #eee' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Don't have an account? <Link href="/register" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Register here</Link>
          </Typography>
        </Box>

        {/* Demo login removed for production styling */}
      </Paper>
    </Container>
  )
}

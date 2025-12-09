import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import localStore from '../services/localStore'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function AdminDashboard(){
  const auth = useAuth()
  const navigate = useNavigate()
  const stats = localStore.getStats(auth.user.id, auth.user.role)
  const [recentBorrows, setRecentBorrows] = useState(localStore.listBorrowings().slice(0, 5))

  const StatCard = ({ title, value, color='primary' }) => (
    <Card>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <Typography variant="h5" sx={{ color: color, fontWeight: 'bold', mt: 1 }}>{value}</Typography>
      </CardContent>
    </Card>
  )

  return (
    <Container sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Admin Dashboard</Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Books" value={stats.totalBooks} color="#2196f3" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Borrowings" value={stats.totalBorrowings} color="#4caf50" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Active Borrowings" value={stats.activeBorrowings} color="#ff9800" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Users" value={stats.totalUsers} color="#9c27b0" /></Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={() => navigate('/admin')}>Manage Books</Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/books')}>Browse All</Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Recent Borrowings</Typography>
          <Box>
            {recentBorrows.map(b => (
              <Box key={b.id} sx={{ p: 1.5, borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 'none' } }}>
                <Typography variant="body2"><strong>{b.user?.name}</strong> borrowed <strong>{b.book?.title}</strong></Typography>
                <Typography variant="caption" color="textSecondary">{new Date(b.dateBorrowed).toLocaleString()}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

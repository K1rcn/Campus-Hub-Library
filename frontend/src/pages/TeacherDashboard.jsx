import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import localStore from '../services/localStore'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function TeacherDashboard(){
  const auth = useAuth()
  const stats = localStore.getStats(auth.user.id, auth.user.role)
  const allBorrows = localStore.listBorrowings()

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
      <Typography variant="h4" sx={{ mb: 1 }}>Welcome, {auth.user.name}</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Computer Science Department</Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Total Books" value={stats.totalBooks} color="#2196f3" /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Active Borrowings" value={stats.activeBorrowings} color="#ff9800" /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Your Borrowings" value={stats.userBorrowings} color="#4caf50" /></Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Library Statistics</Typography>
          <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2">Total Books: {stats.totalBooks}</Typography>
            <Typography variant="body2">Total Borrowings: {stats.totalBorrowings}</Typography>
            <Typography variant="body2">Active Borrowings: {stats.activeBorrowings}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

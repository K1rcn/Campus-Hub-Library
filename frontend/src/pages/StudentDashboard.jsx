import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import localStore from '../services/localStore'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function StudentDashboard(){
  const auth = useAuth()
  const stats = localStore.getStats(auth.user.id, auth.user.role)
  const [myBorrows, setMyBorrows] = useState([])

  useEffect(() => {
    const borrows = localStore.listBorrowings(auth.user.id, 'student')
    setMyBorrows(borrows.filter(b => !b.returned))
  }, [auth.user.id])

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
      <Typography variant="h4" sx={{ mb: 1 }}>Hello, {auth.user.name}!</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Enrollment: {auth.user.enrollment}</Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}><StatCard title="My Borrowings" value={stats.userBorrowings} color="#4caf50" /></Grid>
        <Grid item xs={12} sm={6}><StatCard title="Available Books" value={stats.totalBooks} color="#2196f3" /></Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>My Active Borrowings</Typography>
          {myBorrows.length > 0 ? (
            <Box>
              {myBorrows.map(b => (
                <Box key={b.id} sx={{ p: 1.5, borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 'none' } }}>
                  <Typography variant="body2"><strong>{b.book?.title}</strong></Typography>
                  <Typography variant="caption" color="textSecondary">By {b.book?.author}</Typography><br/>
                  <Typography variant="caption">Borrowed: {new Date(b.dateBorrowed).toLocaleDateString()}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">You haven't borrowed any books yet.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

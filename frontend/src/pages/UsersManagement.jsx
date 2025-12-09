import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import localStore from '../services/localStore'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Alert from '@mui/material/Alert'

export default function UsersManagement(){
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newRole, setNewRole] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  function loadUsers() {
    const allUsers = localStore.listUsers ? localStore.listUsers() : []
    setUsers(allUsers)
  }

  if (user?.role !== 'admin') {
    return <Alert severity="error">Access denied. Admin only.</Alert>
  }

  function handleOpenDialog(selectedUser) {
    setSelectedUser(selectedUser)
    setNewRole(selectedUser.role)
    setOpenDialog(true)
  }

  function handleCloseDialog() {
    setOpenDialog(false)
    setSelectedUser(null)
  }

  function handleChangeRole() {
    if (selectedUser && localStore.updateUserRole) {
      const res = localStore.updateUserRole(selectedUser.id, newRole)
      if (res.ok) {
        setMsg(`Role updated for ${selectedUser.name}`)
        loadUsers()
        handleCloseDialog()
      }
    }
  }

  const roleColors = { admin: '#d32f2f', teacher: '#f57c00', student: '#388e3c' }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          User Management
        </Typography>
        {msg && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMsg('')}>
            {msg}
          </Alert>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell>{u.name}</TableCell>
                <TableCell>@{u.username}</TableCell>
                <TableCell>
                  <Chip
                    label={u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    sx={{
                      bgcolor: roleColors[u.role],
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip label="Active" color="success" variant="outlined" />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog(u)}
                    disabled={u.id === user.id}
                  >
                    Change Role
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Change Role Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedUser && (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                User: <strong>{selectedUser.name}</strong> (@{selectedUser.username})
              </Typography>
              <FormControl fullWidth>
                <InputLabel>New Role</InputLabel>
                <Select
                  value={newRole}
                  label="New Role"
                  onChange={e => setNewRole(e.target.value)}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleChangeRole} variant="contained">
            Update Role
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

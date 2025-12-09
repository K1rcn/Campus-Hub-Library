import React, { useEffect, useState } from 'react'
import localStore from '../services/localStore'
import { useAuth } from '../context/AuthContext'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

export default function Borrowings(){
  const { user } = useAuth()
  const [items, setItems] = useState([])
  function load(){
    const uId = user ? user.id : null
    const uRole = user ? user.role : null
    setItems(localStore.listBorrowings(uId, uRole))
  }
  useEffect(()=>{ load() }, [user])

  function doReturn(id){
    if (!user) return
    const res = localStore.returnBook(id, user.id)
    if (!res.ok) alert(res.msg || 'Return failed')
    load()
  }

  return (
    <Container sx={{ mt:3 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Book</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Returned</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(it => (
                <TableRow key={it.id}>
                  <TableCell>{it.user?.name}</TableCell>
                  <TableCell>{it.book?.title}</TableCell>
                  <TableCell>{new Date(it.dateBorrowed).toLocaleString()}</TableCell>
                  <TableCell>{it.returned ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {!it.returned && user && it.user && user.id === it.user.id ? (
                      <Button size="small" onClick={()=>doReturn(it.id)}>Return</Button>
                    ) : (
                      it.returned ? 'Returned' : '—'
                    )}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

import React, { useEffect, useState } from 'react'
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
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'

export default function AdminBooks(){
  const [books, setBooks] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title:'', author:'', copies:1, isbn:'', year:2020 })
  const [editId, setEditId] = useState(null)

  function load(){ setBooks(localStore.listBooks({ page:1, perPage:1000 }).items) }
  useEffect(()=>{ load() }, [])

  function openCreate(){ setForm({ title:'', author:'', copies:1, isbn:'', year:2020 }); setEditId(null); setOpen(true) }
  function openEdit(b){ setForm({...b}); setEditId(b.id); setOpen(true) }

  function save(){
    if (editId) localStore.updateBook(editId, form)
    else localStore.createBook(form)
    setOpen(false)
    load()
  }

  function del(id){ if (confirm('Delete book?')){ localStore.deleteBook(id); load() } }

  return (
    <Container sx={{ mt:3 }}>
      <Button variant="contained" onClick={openCreate}>Add Book</Button>
      <TableContainer component={Paper} sx={{ mt:2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(b => (
              <TableRow key={b.id}>
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.author}</TableCell>
                <TableCell>{b.available}/{b.copies}</TableCell>
                <TableCell>
                  <Button size="small" onClick={()=>openEdit(b)}>Edit</Button>
                  <Button size="small" onClick={()=>del(b.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>{editId ? 'Edit Book' : 'Add Book'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} sx={{ mt:1 }} />
          <TextField fullWidth label="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} sx={{ mt:1 }} />
          <TextField fullWidth label="Copies" type="number" value={form.copies} onChange={e=>setForm({...form,copies:Number(e.target.value)})} sx={{ mt:1 }} />
          <TextField fullWidth label="ISBN" value={form.isbn} onChange={e=>setForm({...form,isbn:e.target.value})} sx={{ mt:1 }} />
          <TextField fullWidth label="Year" type="number" value={form.year} onChange={e=>setForm({...form,year:Number(e.target.value)})} sx={{ mt:1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={save} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

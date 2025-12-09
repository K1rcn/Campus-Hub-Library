import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import localStore from '../services/localStore'
import { useAuth } from '../context/AuthContext'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function BookDetail(){
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    const b = localStore.getBook(id)
    setBook(b)
  }, [id])

  const auth = useAuth()

  function borrow(){
    const userId = auth?.user?.id
    if (!userId){ setMsg('Please login to borrow'); return }
    const res = localStore.borrowBook(book.id, userId)
    if (res.ok){
      setMsg('Borrowed successfully')
      setBook(localStore.getBook(id))
    }else{
      setMsg(res.msg)
    }
  }

  return (
    <Container sx={{ mt:3 }}>
      {book ? (
        <>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="subtitle1">{book.author}, {book.year}</Typography>
          <Typography sx={{ mt:2 }}>ISBN: {book.isbn}</Typography>
          <Typography sx={{ mt:1 }}>Available: {book.available} / {book.copies}</Typography>
          <Box sx={{ mt:3 }}>
            <Button variant="contained" onClick={borrow} disabled={book.available<=0}>Borrow</Button>
          </Box>
          <Typography sx={{ mt:2 }}>{msg}</Typography>
        </>
      ) : <Typography>Book not found</Typography>}
    </Container>
  )
}

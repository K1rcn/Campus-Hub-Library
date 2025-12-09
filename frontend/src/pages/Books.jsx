import React, { useEffect, useState, useMemo } from 'react'
import localStore from '../services/localStore'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function Books(){
  const [q, setQ] = useState('')
  const [section, setSection] = useState('')
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [sortBy, setSortBy] = useState('relevance')
  const perPage = itemsPerPage

  const [allBooks, setAllBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sections = ['Tech', 'English Literature', 'Manga & Comics', 'Urdu Books', 'Science', 'Novels', 'Business & Self-Help', 'History & Biography', 'Children & Young Adult']

  // Load all books from localStore safely
  useEffect(() => {
    let mounted = true
    try {
      setLoading(true)
      const res = localStore.listBooks({ page: 1, perPage: 9999, q: '' })
      if (mounted) setAllBooks(Array.isArray(res.items) ? res.items : [])
    } catch (err) {
      console.error('Failed loading books', err)
      if (mounted) setError(String(err))
    } finally {
      if (mounted) setLoading(false)
    }
    return () => { mounted = false }
  }, [])

  // Filter books
  const filteredBooks = useMemo(() => {
    let filtered = allBooks
    
    // Search filter
    if (q) {
      const ql = q.toLowerCase()
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(ql) || 
        b.author.toLowerCase().includes(ql) || 
        (b.isbn || '').includes(ql) ||
        (b.category || '').toLowerCase().includes(ql)
      )
    }
    
    // Section filter
    if (section) {
      filtered = filtered.filter(b => b.section === section)
    }
    
    return filtered
  }, [allBooks, q, section])

  // Pagination
  // Sorting (apply before pagination)
  const sortedBooks = useMemo(() => {
    const arr = filteredBooks.slice()
    if (sortBy === 'newest') return arr.sort((a,b) => (b.year||0) - (a.year||0))
    if (sortBy === 'title-asc') return arr.sort((a,b) => a.title.localeCompare(b.title))
    if (sortBy === 'title-desc') return arr.sort((a,b) => b.title.localeCompare(a.title))
    return arr
  }, [filteredBooks, sortBy])

  const total = sortedBooks.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage
  const displayedBooks = sortedBooks.slice(start, start + perPage)

  useEffect(() => {
    setPage(1)
  }, [q, section])

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">Loading books…</Typography>
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error">Failed to load books</Typography>
          <Typography variant="body2" color="text.secondary">{error}</Typography>
        </Box>
      </Container>
    )
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
          Campus Hub Library Catalog
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Discover {allBooks.length} books across {sections.length} categories
        </Typography>

        {/* Filters & Controls */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Search by title, author, ISBN" 
              value={q} 
              onChange={e => setQ(e.target.value)}
              placeholder="e.g., Harry Potter, Naruto, Python..."
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="section-select-label">Browse by Section</InputLabel>
              <Select
                labelId="section-select-label"
                value={section}
                label="Browse by Section"
                onChange={e => setSection(e.target.value)}
              >
                <MenuItem value="">All Sections</MenuItem>
                {sections.map(s => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-select-label">Sort</InputLabel>
              <Select labelId="sort-select-label" value={sortBy} label="Sort" onChange={e => setSortBy(e.target.value)}>
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="title-asc">Title A→Z</MenuItem>
                <MenuItem value="title-desc">Title Z→A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="perpage-select-label">Per Page</InputLabel>
              <Select labelId="perpage-select-label" value={itemsPerPage} label="Per Page" onChange={e => { setItemsPerPage(Number(e.target.value)); setPage(1) }}>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={48}>48</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Active Filters */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2, alignItems: 'center' }}>
          {q && <Chip label={`"${q}"`} onDelete={() => setQ('')} />}
          {section && <Chip label={section} onDelete={() => setSection('')} />}
          <Typography variant="caption" color="text.secondary">
            Found <strong>{total}</strong> book{total !== 1 ? 's' : ''} • Page {page} of {totalPages}
          </Typography>
        </Box>
      </Box>

      {/* Books Grid */}
      {displayedBooks.length > 0 ? (
        <>
          <Grid container spacing={2.5}>
            {displayedBooks.map(b => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={b.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: '#fafafa',
                    border: '1px solid #e0e0e0',
                    '&:hover': { 
                      boxShadow: 4, 
                      transform: 'translateY(-6px)',
                      backgroundColor: '#fff'
                    }, 
                    transition: 'all 0.3s ease'
                  }}
                >
                  {b.coverUrl && (
                    <CardMedia
                      component="img"
                      image={b.coverUrl}
                      alt={b.title}
                      sx={{ height: 220, objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    {/* Section Badge */}
                    <Box sx={{ mb: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      <Chip 
                        label={b.section} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ height: 24 }}
                      />
                      {b.available > 0 ? (
                        <Chip 
                          label="Available" 
                          size="small"
                          sx={{ height: 24, backgroundColor: '#c8e6c9', color: '#2e7d32', fontWeight: 'bold' }}
                        />
                      ) : (
                        <Chip 
                          label="Unavailable" 
                          size="small"
                          sx={{ height: 24, backgroundColor: '#ffcdd2', color: '#c62828', fontWeight: 'bold' }}
                        />
                      )}
                    </Box>

                    {/* Title */}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        mb: 0.5, 
                        minHeight: '2.8em',
                        fontSize: '0.95rem',
                        lineHeight: 1.4
                      }}
                    >
                      {b.title.length > 60 ? b.title.substring(0, 60) + '...' : b.title}
                    </Typography>

                    {/* Author */}
                    <Typography 
                      variant="subtitle2" 
                      color="primary"
                      sx={{ mb: 0.5, fontWeight: 500 }}
                    >
                      {b.author.length > 40 ? b.author.substring(0, 40) + '...' : b.author}
                    </Typography>

                    {/* Meta Info */}
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      display="block" 
                      sx={{ mb: 1 }}
                    >
                      {b.category} • {b.year}
                    </Typography>

                    {/* ISBN */}
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      display="block" 
                      sx={{ mb: 1.5, fontFamily: 'monospace' }}
                    >
                      ISBN: {b.isbn}
                    </Typography>

                    {/* Availability */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Copies:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: b.available > 0 ? '#388e3c' : '#d32f2f' }}>
                          {b.available} / {b.copies}
                        </Typography>
                      </Box>
                    </Box>

                    {/* View Details Button */}
                      <Button 
                      size="small" 
                      component={Link} 
                      to={`/books/${b.id}`} 
                      variant="contained" 
                      fullWidth
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 500,
                        mt: 'auto'
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={(e, v) => setPage(v)}
                color="primary"
              />
            </Box>
          )}
        </>
      ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No books found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search or clearing the filters
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => { setQ(''); setSection(''); setPage(1) }}
          >
            Clear All Filters
          </Button>
        </Box>
      )}
    </Container>
  )
}

import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import localStore from '../services/localStore'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'

function parseCSV(text){
  // Simple CSV parser supporting quoted fields
  const rows = []
  let cur = ''
  let row = []
  let inQuotes = false
  for (let i = 0; i < text.length; i++){
    const ch = text[i]
    if (ch === '"') {
      if (inQuotes && text[i+1] === '"') { cur += '"'; i++; continue }
      inQuotes = !inQuotes
      continue
    }
    if (ch === ',' && !inQuotes){ row.push(cur); cur = ''; continue }
    if ((ch === '\n' || ch === '\r') && !inQuotes){
      if (cur !== '' || row.length) { row.push(cur); rows.push(row); row = []; cur = '' }
      // handle CRLF: skip next if \n after \r
      continue
    }
    cur += ch
  }
  if (cur !== '' || row.length) { row.push(cur); rows.push(row) }
  return rows
}

export default function AdminImportBooks(){
  const [fileText, setFileText] = useState('')
  const [previewCount, setPreviewCount] = useState(0)
  const [message, setMessage] = useState('')
  const [headers, setHeaders] = useState([])
  const [rowsData, setRowsData] = useState([]) // array of objects
  const [selected, setSelected] = useState(new Set())

  function handleFile(e){
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result)
      setFileText(text)
      const rows = parseCSV(text)
      if (rows.length < 1) { setPreviewCount(0); setHeaders([]); setRowsData([]); return }
      const hdr = rows[0].map(h => h.trim())
      const data = rows.slice(1).map(r => {
        const obj = {}
        for (let c = 0; c < hdr.length; c++) obj[hdr[c]] = (r[c] || '').trim()
        return obj
      })
      setHeaders(hdr)
      setRowsData(data)
      setPreviewCount(data.length)
      // select first 10 by default
      const sel = new Set()
      data.slice(0, 10).forEach((_, i) => sel.add(i))
      setSelected(sel)
    }
    reader.readAsText(f)
  }

  function handleImport(selectedOnly = true){
    if (rowsData.length === 0) { setMessage('No data to import'); return }
    const targetIdx = selectedOnly ? Array.from(selected) : rowsData.map((_,i) => i)
    let created = 0
    targetIdx.forEach(i => {
      const obj = rowsData[i]
      if (!obj || !obj.title) return
      const copies = Number(obj.copies) || 1
      const available = obj.available ? Number(obj.available) : copies
      const book = {
        title: obj.title,
        author: obj.author || 'Unknown',
        year: Number(obj.year) || new Date().getFullYear(),
        isbn: obj.isbn || '',
        category: obj.category || '',
        section: obj.section || 'Novels',
        copies,
        available,
        coverUrl: obj.coverUrl || obj.coverurl || ''
      }
      localStore.createBook(book)
      created++
    })
    setMessage(`Imported ${created} books`)
    // clear selection and preview
    setFileText('')
    setPreviewCount(0)
    setHeaders([])
    setRowsData([])
    setSelected(new Set())
  }

  function downloadTemplate(){
    const header = 'title,author,year,isbn,category,section,copies,available,coverUrl\n'
    const sample = 'Custom Title,Author Name,2020,ISBN12345,Fiction,Novels,3,3,https://example.com/cover.jpg\n'
    const blob = new Blob([header + sample], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'books-template.csv'; a.click(); URL.revokeObjectURL(url)
  }

  function toggleRow(i){
    const s = new Set(selected)
    if (s.has(i)) s.delete(i); else s.add(i)
    setSelected(s)
  }

  function selectAll(){
    const s = new Set(rowsData.map((_,i) => i))
    setSelected(s)
  }

  function clearSelection(){ setSelected(new Set()) }

  function downloadSelected(){
    if (selected.size === 0) { setMessage('No rows selected to download'); return }
    const hdr = headers.length ? headers : Object.keys(rowsData[0] || {})
    const lines = [hdr.join(',')]
    Array.from(selected).forEach(i => {
      const row = rowsData[i]
      const vals = hdr.map(h => '"' + ((row[h]||'').replace(/"/g,'""')) + '"')
      lines.push(vals.join(','))
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'selected-books.csv'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Admin — Import Books (CSV)</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Upload a CSV with header row: title,author,year,isbn,category,section,copies,available,coverUrl</Typography>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Button variant="contained" component="label">Choose CSV File<input hidden type="file" accept=".csv,text/csv" onChange={handleFile} /></Button>
          <Button variant="outlined" onClick={downloadTemplate}>Download Template</Button>
          <Button variant="outlined" onClick={() => {
            // validate and select only rows that look valid
            const sel = new Set()
            rowsData.forEach((r, i) => { if (r && r.title && r.title.trim()) sel.add(i) })
            setSelected(sel)
            setMessage(`Selected ${sel.size} valid rows`) 
          }}>Check Valid Rows</Button>
          <Button variant="outlined" onClick={selectAll}>Select All</Button>
          <Button variant="outlined" onClick={clearSelection}>Clear Selection</Button>
          <Button variant="outlined" onClick={downloadSelected}>Download Selected</Button>
          <Typography variant="body2" color="text.secondary">Preview rows: {previewCount}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField label="CSV Preview / Raw" multiline fullWidth minRows={6} value={fileText} onChange={e=>setFileText(e.target.value)} />
        </Box>

        {rowsData.length > 0 && (
          <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 320 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"><Checkbox checked={selected.size === rowsData.length} indeterminate={selected.size>0 && selected.size<rowsData.length} onChange={(e)=> e.target.checked ? selectAll() : clearSelection()} /></TableCell>
                  {headers.map(h=> <TableCell key={h}>{h}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsData.map((r, i) => {
                  const invalid = !r || !r.title || !r.title.trim()
                  return (
                  <TableRow key={i} hover sx={ invalid ? { backgroundColor: '#fff3f0' } : {} }>
                    <TableCell padding="checkbox"><Checkbox checked={selected.has(i)} onChange={()=>toggleRow(i)} /></TableCell>
                    {headers.map(h => <TableCell key={h}>{r[h]}</TableCell>)}
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => handleImport(true)}>Import Selected</Button>
          <Button variant="outlined" onClick={() => handleImport(false)}>Import All</Button>
          <Button variant="outlined" onClick={() => { setFileText(''); setPreviewCount(0); setMessage(''); setRowsData([]); setHeaders([]); setSelected(new Set()) }}>Clear</Button>
        </Box>
      </Paper>
    </Container>
  )
}

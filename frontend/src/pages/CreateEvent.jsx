import React, { useState } from 'react'
import api from '../services/api'

export default function CreateEvent(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault()
    try{
      const res = await api.post('/events', { title, description })
      setMsg('Event created: ' + res.data.title)
      setTitle('')
      setDescription('')
    }catch(err){
      setMsg(err?.response?.data?.msg || 'Create failed')
    }
  }

  return (
    <div style={{padding:20}}>
      <h3>Create Event (public)</h3>
      <form onSubmit={submit}>
        <div>
          <label>Title</label><br/>
          <input value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description</label><br/>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4} cols={40} />
        </div>
        <div style={{marginTop:10}}>
          <button type="submit">Create</button>
        </div>
      </form>
      <p>{msg}</p>
    </div>
  )
}

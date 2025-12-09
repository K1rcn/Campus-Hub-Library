import localStore from './localStore'

// Vite env var (use `VITE_API_URL`) or default to local Flask backend
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:5000/api'

async function tryFetch(path, opts){
  const url = `${API_BASE}${path}`
  try{
    const res = await fetch(url, opts)
    if (!res.ok) {
      // non-2xx -> treat as failure and fallback
      throw new Error(`HTTP ${res.status}`)
    }
    return await res.json()
  }catch(err){
    // console.warn('Backend fetch failed, falling back to localStore', err)
    throw err
  }
}

export default {
  async listBooks(params={}){
    const { page=1, perPage=10, q='' } = params
    try{
      return await tryFetch(`/books?page=${page}&per_page=${perPage}&q=${encodeURIComponent(q)}`)
    }catch(e){
      return localStore.listBooks(params)
    }
  },
  async getBook(id){
    try{ return await tryFetch(`/books/${id}`) }catch(e){ return localStore.getBook(id) }
  },
  async createBook(data){
    try{ return await tryFetch('/books', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }) }catch(e){ return localStore.createBook(data) }
  },
  async updateBook(id, data){
    try{ return await tryFetch(`/books/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }) }catch(e){ return localStore.updateBook(id, data) }
  },
  async deleteBook(id){
    try{ return await tryFetch(`/books/${id}`, { method:'DELETE' }) }catch(e){ return localStore.deleteBook(id) }
  },
  async borrowBook(bookId, userId){
    try{ return await tryFetch(`/books/${bookId}/borrow`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_id: userId }) }) }catch(e){ return localStore.borrowBook(bookId, userId) }
  },
  async returnBook(borrowId){
    try{ return await tryFetch(`/borrowings/${borrowId}/return`, { method:'POST' }) }catch(e){ return localStore.returnBook(borrowId) }
  },
  async listBorrowings(userId=null, userRole=null){
    try{ return await tryFetch(`/borrowings${userId?`?user_id=${userId}`:''}`) }catch(e){ return localStore.listBorrowings(userId, userRole) }
  },
  async listUsers(){
    try{ return await tryFetch('/users') }catch(e){ return localStore.listUsers() }
  },
  async createUser(payload){
    try{ return await tryFetch('/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }) }catch(e){ return localStore.createUser(payload) }
  },
  async authenticateUser(username, password){
    try{
      return await tryFetch('/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) })
    }catch(e){ return localStore.authenticateUser(username, password) }
  },
  async getStats(userId, userRole){
    try{ return await tryFetch(`/stats${userId?`?user_id=${userId}`:''}`) }catch(e){ return localStore.getStats(userId, userRole) }
  },
  async updateUserRole(userId, newRole){
    try{ return await tryFetch(`/users/${userId}/role`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ role: newRole }) }) }catch(e){ return localStore.updateUserRole(userId, newRole) }
  }
}

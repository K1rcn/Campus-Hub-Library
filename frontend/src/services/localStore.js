// src/services/localStore.js
// Robust, defensive local mock store for CampusHub
const KEY = 'campushub_library_v2_expanded';

function seed() {
  try {
    // If already seeded, skip.
    if (localStorage.getItem(KEY)) return;

    // --- Base fixed catalog (100 items as before) ---
    const books = [
      { id: 1, title: 'Introduction to Algorithms', author: 'Cormen et al.', copies: 5, available: 3, year: 2009, isbn: '9780262033848', category: 'Computer Science', section: 'Tech' },
      { id: 2, title: 'Clean Code', author: 'Robert C. Martin', copies: 3, available: 2, year: 2008, isbn: '9780132350884', category: 'Programming', section: 'Tech' },
      { id: 3, title: 'Design Patterns', author: 'Gamma et al.', copies: 2, available: 1, year: 1994, isbn: '9780201633610', category: 'Software Design', section: 'Tech' },
      { id: 4, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', copies: 3, available: 3, year: 1999, isbn: '9780135957059', category: 'Programming', section: 'Tech' },
      { id: 5, title: 'Code Complete', author: 'Steve McConnell', copies: 2, available: 2, year: 2004, isbn: '9780735619678', category: 'Programming', section: 'Tech' },
      { id: 6, title: 'The C Programming Language', author: 'Kernighan & Ritchie', copies: 4, available: 2, year: 1988, isbn: '9780131103627', category: 'Programming', section: 'Tech' },
      { id: 7, title: 'Python Crash Course', author: 'Eric Matthes', copies: 6, available: 4, year: 2015, isbn: '9781593275952', category: 'Programming', section: 'Tech' },
      { id: 8, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', copies: 3, available: 3, year: 2018, isbn: '9781593279508', category: 'Programming', section: 'Tech' },
      { id: 9, title: 'Data Structures and Algorithms', author: 'Narasimha Karumanchi', copies: 3, available: 2, year: 2016, isbn: '9781504703529', category: 'Computer Science', section: 'Tech' },
      { id: 10, title: 'The Art of Computer Programming', author: 'Donald Knuth', copies: 2, available: 1, year: 1997, isbn: '9780201896831', category: 'Computer Science', section: 'Tech' },
      { id: 11, title: 'Java: The Complete Reference', author: 'Herbert Schildt', copies: 3, available: 3, year: 2018, isbn: '9781260440249', category: 'Programming', section: 'Tech' },
      { id: 12, title: 'Database Design Manual', author: 'C.J. Date', copies: 2, available: 2, year: 2015, isbn: '9781449391423', category: 'Computer Science', section: 'Tech' },
      { id: 13, title: 'Web Development with Node.js', author: 'Mike Cantelon', copies: 3, available: 2, year: 2013, isbn: '9781449398583', category: 'Programming', section: 'Tech' },
      { id: 14, title: 'Machine Learning Basics', author: 'Andrew Ng', copies: 4, available: 3, year: 2017, isbn: '9781491952016', category: 'Computer Science', section: 'Tech' },
      { id: 15, title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', copies: 2, available: 1, year: 2009, isbn: '9780136042594', category: 'Computer Science', section: 'Tech' },

      { id: 16, title: 'Pride and Prejudice', author: 'Jane Austen', copies: 5, available: 3, year: 1813, isbn: '9780141439518', category: 'Classic Novel', section: 'English Literature' },
      { id: 17, title: 'To Kill a Mockingbird', author: 'Harper Lee', copies: 6, available: 4, year: 1960, isbn: '9780061120084', category: 'Novel', section: 'English Literature' },
      { id: 18, title: '1984', author: 'George Orwell', copies: 5, available: 3, year: 1949, isbn: '9780451524935', category: 'Dystopian Novel', section: 'English Literature' },
      { id: 19, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', copies: 5, available: 4, year: 1925, isbn: '9780743273565', category: 'Classic Novel', section: 'English Literature' },
      { id: 20, title: 'Jane Eyre', author: 'Charlotte Brontë', copies: 4, available: 2, year: 1847, isbn: '9780141441146', category: 'Classic Novel', section: 'English Literature' },
      { id: 21, title: 'The Catcher in the Rye', author: 'J.D. Salinger', copies: 4, available: 3, year: 1951, isbn: '9780316769174', category: 'Novel', section: 'English Literature' },
      { id: 22, title: 'Wuthering Heights', author: 'Emily Brontë', copies: 3, available: 2, year: 1847, isbn: '9780141441123', category: 'Classic Novel', section: 'English Literature' },
      { id: 23, title: 'Moby Dick', author: 'Herman Melville', copies: 3, available: 2, year: 1851, isbn: '9780142437247', category: 'Classic Novel', section: 'English Literature' },
      { id: 24, title: 'The Hobbit', author: 'J.R.R. Tolkien', copies: 6, available: 4, year: 1937, isbn: '9780547928227', category: 'Fantasy Novel', section: 'English Literature' },
      { id: 25, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', copies: 8, available: 5, year: 1997, isbn: '9780439708180', category: 'Fantasy Novel', section: 'English Literature' },

      // ... (you had up to 100 previously; keep the rest if you want)
    ];

    // Keep users and borrowings as before
    const users = [
      { id: 1, name: 'Admin User', role: 'admin', username: 'admin', password: 'admin123', email: 'admin@campushub.edu' },
      { id: 2, name: 'Dr. Emily Johnson', role: 'teacher', username: 'teacher1', password: 'teacher123', email: 'emily@campushub.edu', department: 'Computer Science' },
      { id: 3, name: 'Prof. David Smith', role: 'teacher', username: 'teacher2', password: 'teacher123', email: 'david@campushub.edu', department: 'Engineering' },
      { id: 4, name: 'Alice Cooper', role: 'student', username: 'alice', password: 'alice123', email: 'alice@student.campushub.edu', enrollment: 'CS101' },
      { id: 5, name: 'Bob Johnson', role: 'student', username: 'bob', password: 'bob123', email: 'bob@student.campushub.edu', enrollment: 'CS102' }
    ];

    const borrowings = [
      { id: 1, bookId: 1, userId: 4, dateBorrowed: new Date(Date.now()-86400000).toISOString(), returned: false },
      { id: 2, bookId: 2, userId: 5, dateBorrowed: new Date(Date.now()-172800000).toISOString(), returned: false },
    ];

    // --- Optional: generate extra books, but keep it small and safe (200 max)
    (function generateMoreBooksSafely(){
      try {
        const target = 200; // safe dev cap (increase later if you want)
        let nextId = books.length + 1;

        // small coverMap and section samples (safe)
        const coverMap = {
          'python': 'https://picsum.photos/seed/python/300/420',
          'dune': 'https://picsum.photos/seed/dune/300/420',
          'hobbit': 'https://picsum.photos/seed/hobbit/300/420'
        };

        const sectionsSamples = {
          'Tech': ['Advanced Algorithms', 'Cloud Patterns', 'Modern DevOps'],
          'Novels': ['Contemporary Mystery', 'Literary Romance'],
          'Science': ['Applied Mathematics', 'Neuroscience Today']
        };
        const sectionKeys = Object.keys(sectionsSamples);

        while (books.length < target) {
          const sec = sectionKeys[books.length % sectionKeys.length];
          const samples = sectionsSamples[sec];
          const idx = books.length % samples.length;
          const titleBase = samples[idx];
          const title = `${titleBase} - Vol ${Math.floor(books.length/10)+1}`;
          const author = sec === 'Urdu Books' ? 'مختلف مصنفین' : `Author ${Math.floor(Math.random()*300)+1}`;
          const copies = 2 + (books.length % 5);
          const available = Math.max(0, copies - (Math.floor(Math.random()*2)));
          const year = 1980 + (books.length % 45);
          const isbn = `GEN-${nextId.toString().padStart(6,'0')}`;
          const normalizedTitle = (title || '').toLowerCase();
          const mappedKey = Object.keys(coverMap).find(k => normalizedTitle.includes(k));
          const coverUrl = mappedKey ? coverMap[mappedKey] : `https://picsum.photos/seed/book${nextId}/300/420`;
          books.push({ id: nextId, title, author, copies, available, year, isbn, category: sec, section: sec, coverUrl });
          nextId += 1;
        }
      } catch (err) {
        console.error('generateMoreBooksSafely failed', err);
      }
    })();

    // Ensure coverUrl exists
    books.forEach(b => {
      if (!b.coverUrl) b.coverUrl = `https://picsum.photos/seed/book${b.id}/300/420`;
    });

    const store = { books, users, borrowings, nextBookId: books.length + 1, nextUserId: users.length + 1, nextBorrowId: borrowings.length + 1 };
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch (err) {
    // Very defensive: do not let seed throw
    console.error('SEED ERROR:', err);
    // Try to write a minimal fallback store so app can keep working
    try {
      const fallback = {
        books: [],
        users: [{ id:1, username:'admin', password:'admin123', role:'admin', name:'Admin User'}],
        borrowings: [],
        nextBookId: 2,
        nextUserId: 2,
        nextBorrowId: 1
      };
      localStorage.setItem(KEY, JSON.stringify(fallback));
    } catch (e) {
      // nothing else we can do
      console.error('fallback seed failed', e);
    }
  }
}

function read(){ seed(); try { return JSON.parse(localStorage.getItem(KEY)) || { books: [], users: [], borrowings: [], nextBookId: 1, nextUserId: 1, nextBorrowId: 1 }; } catch(e){ console.error('read parse error', e); return { books: [], users: [], borrowings: [], nextBookId: 1, nextUserId: 1, nextBorrowId: 1 }; } }
function write(store){ try { localStorage.setItem(KEY, JSON.stringify(store)); } catch(e){ console.error('write error', e); } }

export default {
  listBooks({ page=1, perPage=10, q='' }={}) {
    const s = read();
    let arr = Array.isArray(s.books) ? s.books.slice() : [];
    if (q) {
      const ql = String(q).toLowerCase();
      arr = arr.filter(b => (b.title||'').toLowerCase().includes(ql) || (b.author||'').toLowerCase().includes(ql) || (String(b.isbn||'')).includes(ql));
    }
    const total = arr.length;
    const start = (page-1)*perPage;
    return { items: arr.slice(start, start+perPage), total };
  },

  getBook(id){
    const s = read();
    if (!Array.isArray(s.books)) return null;
    return s.books.find(b => b.id === Number(id)) || null;
  },

  createBook(data){
    const s = read();
    const book = { id: s.nextBookId || 1, ...data };
    s.nextBookId = (s.nextBookId || 1) + 1;
    s.books = Array.isArray(s.books) ? s.books.concat(book) : [book];
    write(s);
    return book;
  },

  updateBook(id, data){
    const s = read();
    if (!Array.isArray(s.books)) return null;
    const idx = s.books.findIndex(b => b.id === Number(id));
    if (idx === -1) return null;
    s.books[idx] = { ...s.books[idx], ...data };
    write(s);
    return s.books[idx];
  },

  deleteBook(id){
    const s = read();
    if (!Array.isArray(s.books)) return false;
    s.books = s.books.filter(b => b.id !== Number(id));
    write(s);
    return true;
  },

  borrowBook(bookId, userId){
    const s = read();
    if (!Array.isArray(s.books)) return { ok:false, msg:'Not available' };
    const book = s.books.find(b => b.id === Number(bookId));
    if (!book || book.available <= 0) return { ok: false, msg: 'Not available' };
    book.available -= 1;
    const borrowedAt = new Date();
    const dueAt = new Date(borrowedAt.getTime() + 14 * 24 * 60 * 60 * 1000);
    const borrow = { id: s.nextBorrowId || 1, bookId: book.id, userId, dateBorrowed: borrowedAt.toISOString(), dateDue: dueAt.toISOString(), dateReturned: null, returned: false, fineAmount: 0 };
    s.nextBorrowId = (s.nextBorrowId || 1) + 1;
    s.borrowings = Array.isArray(s.borrowings) ? s.borrowings.concat(borrow) : [borrow];
    write(s);
    return { ok: true, borrow };
  },

  returnBook(borrowId, requestingUserId){
    const s = read();
    if (!Array.isArray(s.borrowings)) return { ok:false, msg:'Invalid borrowing' };
    const b = s.borrowings.find(x => x.id === Number(borrowId));
    if (!b || b.returned) return { ok:false, msg:'Invalid borrowing' };
    if (b.userId !== Number(requestingUserId)) return { ok:false, msg:'only the borrower can return this book' };
    const returnedAt = new Date();
    b.returned = true;
    b.dateReturned = returnedAt.toISOString();
    let fine = 0;
    if (b.dateDue){
      const due = new Date(b.dateDue);
      const daysOverdue = Math.max(0, Math.ceil((returnedAt - due) / (24*60*60*1000)));
      if (daysOverdue > 0) fine = daysOverdue * 100;
    }
    b.fineAmount = fine;
    const book = s.books.find(x => x.id === b.bookId);
    if (book) book.available += 1;
    write(s);
    return { ok:true, fine, borrow: b };
  },

  listBorrowings(userId=null, userRole=null){
    const s = read();
    let items = Array.isArray(s.borrowings) ? s.borrowings.map(b => ({...b, book: (s.books||[]).find(x=>x.id===b.bookId), user: (s.users||[]).find(u=>u.id===b.userId)})) : [];
    if (userRole === 'student' && userId) items = items.filter(b => b.userId === userId);
    return items;
  },

  listUsers(){ return Array.isArray(read().users) ? read().users.slice() : []; },

  getUserById(id){ const u = (read().users||[]).find(u => u.id === Number(id)); return u || null; },

  findUserByUsername(username){ return (read().users||[]).find(u => String(u.username) === String(username)) || null; },

  createUser({ username, password, name, role='student' }){
    const s = read();
    s.users = Array.isArray(s.users) ? s.users : [];
    if (s.users.find(u => u.username === username)) return { ok:false, msg:'username exists' };
    if (role === 'admin'){
      const adminCount = s.users.filter(u => u.role === 'admin').length;
      if (adminCount >= 4) return { ok:false, msg: 'maximum number of admin accounts reached (4)' };
    }
    const user = { id: s.nextUserId || 1, username, password, name: name || username, role };
    s.nextUserId = (s.nextUserId || 1) + 1;
    s.users.push(user);
    write(s);
    return { ok:true, user };
  },

  updateUser(userId, data){
    const s = read();
    s.users = Array.isArray(s.users) ? s.users : [];
    const u = s.users.find(x => x.id === Number(userId));
    if (!u) return { ok:false, msg:'User not found' };
    Object.assign(u, data);
    write(s);
    return { ok:true, user: u };
  },

  changePassword(userId, newPassword){
    const s = read();
    const u = (s.users||[]).find(x => x.id === Number(userId));
    if (!u) return { ok:false, msg:'User not found' };
    u.password = newPassword;
    write(s);
    return { ok:true };
  },

  authenticateUser(username, password){
    const u = this.findUserByUsername(username);
    if (!u) return { ok:false, msg:'no such user' };
    if (u.password !== password) return { ok:false, msg:'bad credentials' };
    return { ok:true, user: u };
  },

  getStats(userId, userRole){
    const s = read();
    const totalBooks = Array.isArray(s.books) ? s.books.length : 0;
    const totalBorrowings = Array.isArray(s.borrowings) ? s.borrowings.length : 0;
    const activeBorrowings = Array.isArray(s.borrowings) ? s.borrowings.filter(b => !b.returned).length : 0;
    const totalUsers = Array.isArray(s.users) ? s.users.length : 0;
    const userBorrowings = (s.borrowings||[]).filter(b => b.userId === userId && !b.returned);
    return { totalBooks, totalBorrowings, activeBorrowings, totalUsers, userBorrowings: userBorrowings.length };
  },

  updateUserRole(userId, newRole){
    const s = read();
    s.users = Array.isArray(s.users) ? s.users : [];
    const user = s.users.find(u => u.id === Number(userId));
    if (!user) return { ok: false, msg: 'User not found' };
    if (newRole === 'admin' && user.role !== 'admin'){
      const adminCount = s.users.filter(u => u.role === 'admin').length;
      if (adminCount >= 4) return { ok:false, msg: 'maximum number of admin accounts reached (4)' };
    }
    user.role = newRole;
    write(s);
    return { ok: true, user };
  },

  canBorrow(userRole){ return ['student', 'teacher'].includes(userRole); },
  canManageBooks(userRole){ return userRole === 'admin'; },
  canManageUsers(userRole){ return userRole === 'admin'; }
};

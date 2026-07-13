import React, { useState, useEffect } from 'react';

export default function BookLibraryDashboard() {
  // --- STATE DECLARATIONS ---
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); 
  
  // Auth Form Fields
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // --- DIGITAL READER ENGINE STATES ---
  const [activeReadingBook, setActiveReadingBook] = useState(null); // Holds the book currently being read
  const [activeChapter, setActiveChapter] = useState(0); // Tracks current reading page/chapter

  // Book Library Catalog State with real readable text contents
  const [books, setBooks] = useState([
    { 
      id: 1, 
      title: 'The Alchemist', 
      author: 'Paulo Coelho',
      chapters: [
        { title: "Prologue", text: "The alchemist picked up a book that someone in the caravan had brought..." },
        { title: "Chapter 1", text: "The boy's name was Santiago..." }
      ]
    },
    { 
      id: 2, 
      title: 'Pride and Prejudice', 
      author: 'Jane Austen',
      chapters: [
        { title: "Chapter 1", text: "It is a truth universally acknowledged..." },
        { title: "Chapter 2", text: "Mr. Bennet was among the earliest of those who waited on Mr. Bingley..." }
      ]
    },
    { 
      id: 3, 
      title: 'To Kill a Mockingbird', 
      author: 'Harper Lee',
      chapters: [
        { title: "Chapter 1", text: "When he was nearly thirteen, my brother Jem got his arm badly broken..." }
      ]
    },
    { 
      id: 4, 
      title: '1984', 
      author: 'George Orwell',
      chapters: [
        { title: "Chapter 1", text: "It was a bright cold day in April, and the clocks were striking thirteen..." }
      ]
    }
  ]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [newBookText, setNewBookText] = useState(''); // Text for custom added books
  const [searchQuery, setSearchQuery] = useState('');

  // Setup seed accounts (Admin: admin@://library.com)
  useEffect(() => {
    if (!localStorage.getItem('library_users')) {
      const defaultUsers = [
        { email: 'admin@library.com', password: 'password123', name: 'Joseph Mayaka', role: 'admin' },
        { email: 'reader@library.com', password: 'password123', name: 'Standard Reader', role: 'user' }
      ];
      localStorage.setItem('library_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const isAdmin = currentUser && currentUser.role === 'admin';

  // --- HANDLERS ---
  const handleSignup = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !authName) return;
    const currentUsers = JSON.parse(localStorage.getItem('library_users') || '[]');
    if (currentUsers.find(u => u.email.toLowerCase() === authEmail.toLowerCase())) {
      alert('Account already exists!');
      return;
    }
    const newUser = { name: authName, email: authEmail.toLowerCase(), password: authPassword, role: 'user' };
    currentUsers.push(newUser);
    localStorage.setItem('library_users', JSON.stringify(currentUsers));
    alert('Account created successfully!');
    setIsRegistering(false);
    setAuthPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const currentUsers = JSON.parse(localStorage.getItem('library_users') || '[]');
    const matchedUser = currentUsers.find(u => u.email.toLowerCase() === authEmail.toLowerCase() && u.password === authPassword);
    if (matchedUser) {
      setCurrentUser({ name: matchedUser.name, role: matchedUser.role });
      setAuthPassword('');
      setAuthName('');
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!isAdmin || !title || !author) return;
    
    // Create text structure for newly added admin books
    const newBook = { 
      id: Date.now(), 
      title, 
      author,
      chapters: [
        { title: "Full Content", text: newBookText || "No readable content was provided for this item yet." }
      ]
    };
    
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setNewBookText('');
  };

  const handleDeleteBook = (id) => {
    if (!isAdmin) return;
    setBooks(books.filter(book => book.id !== id));
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative' }}>
      
      {!currentUser ? (
        /* ================= AUTHENTICATION VIEW ================= */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)', padding: '1.5rem' }}>
          <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 1.25rem' }}>📚</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>Nyamira Library</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '2.5rem' }}>
              {isRegistering ? 'Create your reader catalog account' : 'Access your catalog monitoring dashboard'}
            </p>

            <form onSubmit={isRegistering ? handleSignup : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              {isRegistering && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', tracking: '0.05em', marginBottom: '0.5rem' }}>Full Name</label>
                  <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Joseph Mayaka" style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }} required />
                </div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', tracking: '0.05em', marginBottom: '0.5rem' }}>Email Address</label>
                <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="name@library.com" style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', tracking: '0.05em', marginBottom: '0.5rem' }}>Password</label>
                <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }} required />
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.85rem', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)', marginTop: '0.75rem' }}>
                {isRegistering ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#64748b' }}>
              {isRegistering ? (
                <>Already have an account? <span style={{ color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }} onClick={() => setIsRegistering(false)}>Sign In</span></>
              ) : (
                <>Don't have an account? <span style={{ color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }} onClick={() => setIsRegistering(true)}>Register</span></>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ================= LIBRARY VIEW ================= */
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: '0' }}>Nyamira Digital Reader</h1>
              <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Welcome back, <span style={{fontWeight:'bold'}}>{currentUser.name}</span> ({currentUser.role})</p>
            </div>
            <button onClick={() => setCurrentUser(null)} style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
          </header>

          {/* Search */}
          <input type="text" placeholder="Search by title or author..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '2rem', fontSize: '1rem' }} />

          {/* Library Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredBooks.map(book => (
              <div key={book.id} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>{book.title}</h3>
                <p style={{ margin: '0', color: '#64748b', fontSize: '0.95rem' }}>by {book.author}</p>
                <button
                  onClick={() => setActiveReadingBook(book)}
                  style={{ marginTop: 'auto', backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '0.75rem', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
                  📖 Read Now
                </button>
                {isAdmin && (
                  <button onClick={() => handleDeleteBook(book.id)} style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.5rem', borderRadius: '8px', border: 'none', fontWeight: '500', cursor: 'pointer', width: '100%', fontSize: '0.875rem', marginTop: '0.5rem' }}>Delete</button>
                )}
              </div>
            ))}
          </div>

          {/* Admin Add Book */}
          {isAdmin && (
            <div style={{ marginTop: '3rem', background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 1.5rem' }}>Add New Book Content</h3>
              <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} required />
                <textarea placeholder="Book Text Content..." value={newBookText} onChange={(e) => setNewBookText(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '100px' }} />
                <button type="submit" style={{ backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Add Book</button>
              </form>
            </div>
          )}
{/* ================= READING MODAL ================= */}
          {activeReadingBook && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', zIndex: 1000 }}>
              <div style={{ background: '#ffffff', width: '100%', maxWidth: '800px', height: '90vh', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <div>
                    <h2 style={{ margin: 0 }}>{activeReadingBook.title}</h2>
                    <p style={{ margin: 0, color: '#64748b' }}>{activeReadingBook.author}</p>
                  </div>
                  <button onClick={() => setActiveReadingBook(null)} style={{ background: '#e2e8f0', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
                  <h3 style={{ color: '#4f46e5' }}>{activeReadingBook.chapters[activeChapter].title}</h3>
                  <p style={{ lineHeight: '1.8', color: '#334155' }}>
                    {activeReadingBook.chapters[activeChapter].text}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                  <button disabled={activeChapter === 0} onClick={() => setActiveChapter(c => c - 1)} style={{ padding: '0.5rem 1rem' }}>Previous</button>
                  <button disabled={activeChapter === activeReadingBook.chapters.length - 1} onClick={() => setActiveChapter(c => c + 1)} style={{ padding: '0.5rem 1rem' }}>Next</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
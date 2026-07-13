import React, { useState } from 'react';
import './App.css';

// Edit this list to include the books you want to appear when the app starts.
// Each entry needs an id, title, and author.
const initialBooks = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 4, title: '1984', author: 'George Orwell' },
  
];

function App() {
  const [authMode, setAuthMode] = useState('login');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [books, setBooks] = useState(initialBooks);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((user) => user.email === normalizedEmail)) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password: password.trim(),
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    resetForm();
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(
      (entry) => entry.email === normalizedEmail && entry.password === password.trim(),
    );

    if (!user) {
      setError('Email or password is incorrect.');
      return;
    }

    setCurrentUser(user);
    resetForm();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthMode('login');
    resetForm();
  };

  const handleAddBook = (event) => {
    event.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) {
      return;
    }

    const book = {
      id: Date.now(),
      title: newTitle.trim(),
      author: newAuthor.trim(),
    };

    setBooks([book, ...books]);
    setNewTitle('');
    setNewAuthor('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-shell">
          <h1>Nyamira Book Library</h1>

          {currentUser ? (
            <div className="panel">
              <div className="panel-header">
                <div>
                  <p className="subtitle">Signed in as</p>
                  <h2>{currentUser.name}</h2>
                </div>
                <button className="button secondary" onClick={handleLogout}>
                  Log out
                </button>
              </div>

              <section className="section">
                <h3>Add a new book</h3>
                <form className="form-grid" onSubmit={handleAddBook}>
                  <label>
                    Title
                    <input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Book title"
                    />
                  </label>
                  <label>
                    Author
                    <input
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Author name"
                    />
                  </label>
                  <button type="submit" className="button primary">
                    Add book
                  </button>
                </form>
              </section>

              <section className="section book-list">
                <h3>Your books</h3>
                {books.length === 0 ? (
                  <p>No books added yet. Use the form above to add a title and author.</p>
                ) : (
                  <ul>
                    {books.map((book) => (
                      <li key={book.id}>
                        <strong>{book.title}</strong>
                        <span>{book.author}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          ) : (
            <div className="panel auth-panel">
              <div className="auth-switch">
                <button
                  className={authMode === 'login' ? 'button active' : 'button ghost'}
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    resetForm();
                  }}>
                  Log in
                </button>
                <button
                  className={authMode === 'signup' ? 'button active' : 'button ghost'}
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    resetForm();
                  }}>
                  Sign up
                </button>
              </div>

              <form className="form-grid" onSubmit={authMode === 'login' ? handleLogin : handleSignup}>
                {authMode === 'signup' && (
                  <label>
                    Full name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </label>
                )}
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
                <button type="submit" className="button primary">
                  {authMode === 'login' ? 'Log in' : 'Create account'}
                </button>
                {error && <p className="error">{error}</p>}
              </form>

              <p className="hint">
                {authMode === 'login'
                  ? "Don't have an account? Click Sign up to create one."
                  : 'Already have an account? Click Log in to continue.'}
              </p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;


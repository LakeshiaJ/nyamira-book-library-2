import React, { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState(() => {
    try {
      const raw = localStorage.getItem("books");
      return raw
        ? JSON.parse(raw)
        : [
            { id: 1, title: "how to become rich", author: "joseph moseti mayaka" },
            { id: 2, title: "how to become a developer", author: "lilian mulei" },
          ];
    } catch {
      return [
        { id: 1, title: "how to become rich", author: "joseph moseti mayaka" },
        { id: 2, title: "how to become a developer", author: "lilian mulei" },
      ];
    }
  });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("books", JSON.stringify(books));
    } catch {
      // ignore storage errors
    }
  }, [books]);

  const addBook = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("Both title and author are required.");
      return;
    }
    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
    };
    setBooks((s) => [newBook, ...s]);
    setTitle("");
    setAuthor("");
    setError("");
  };

  const removeBook = (id) => {
    setBooks((s) => s.filter((b) => b.id !== id));
  };

  return (
    <div style={{ maxWidth: 720, margin: "24px auto", fontFamily: "sans-serif" }}>
      <h1>Nyamira Book Library</h1>

      <form onSubmit={addBook} style={{ marginBottom: 16 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: 8 }}
          autoFocus
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button type="submit">Add Book</button>
      </form>

      {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {books.length === 0 ? (
          <li style={{ color: "#666" }}>No books yet. Add your first book above.</li>
        ) : (
          books.map((book) => (
            <li
              key={book.id}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: 4,
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{book.title}</strong>
                <div style={{ fontSize: 12, color: "#555" }}>{book.author}</div>
              </div>
              <button onClick={() => removeBook(book.id)} style={{ marginLeft: 12 }}>
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
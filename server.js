const express = require("express");
const Database = require("better-sqlite3");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Connect to SQLite
const db = new Database("database.db");

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    text TEXT
  )
`).run();

// Get all events
app.get("/events", (req, res) => {
  const rows = db.prepare("SELECT * FROM events").all();
  res.json(rows);
});

// Add event
app.post("/events", (req, res) => {
  const { date, text } = req.body;
  db.prepare("INSERT INTO events (date, text) VALUES (?, ?)").run(date, text);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


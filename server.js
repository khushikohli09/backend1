// server.js
const express = require('express');
const mysql = require('mysql2'); // MySQL driver
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to RDS database
const db = mysql.createConnection({
  host: "database-1.cx64aao0qpzl.us-east-1.rds.amazonaws.com", // RDS endpoint
  user: "admin",                            // RDS username
  password: "kh123shi",                     // RDS password
  database: "MYKHUSHI"                      // Database name (case-sensitive)
});

// Connect to database


// POST route to handle contact form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Form submitted and saved!" });
  });
});

// Default route (optional: redirect to contact page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contactus.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

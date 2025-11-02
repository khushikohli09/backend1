const express = require('express');
const mysql = require('mysql2'); // MySQL driver
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('frontend')); // your frontend folder

// Connect to RDS database
const db = mysql.createConnection({
  host: "database-1.cx64aao0qpzl.us-east-1.rds.amazonaws.com", // RDS endpoint
  user: "admin",                            // RDS username
  password: "kh123shi",                 // RDS password
  database: "MYKHUSHI"              // Database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to RDS database!");
});

// Example route to insert contact form data
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Form submitted and saved!" });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

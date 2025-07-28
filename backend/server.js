// backend/server.js

const express = require('express');
const cors = require('cors');
const pool = require('./db');         // Make sure this file exists
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Must be included to parse JSON

// ✅ POST /feedback route
app.post('/feedback', async (req, res) => {
  const { name, email, feedback } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO feedback (name, email, feedback) VALUES ($1, $2, $3) RETURNING *',
      [name, email, feedback]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Optional: test route
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

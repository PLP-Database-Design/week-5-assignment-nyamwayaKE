const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();

// Configure environment variables
dotenv.config();

// Create a connection object
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
 
// Test the database connection
db.connect(err => {
    // connection not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }
    // connection is successful
    console.log("Successfully connected to MySql: ",db.threadId);
});

    // QUESTION 1
// 1. Retrieve all patients
app.get('/patients', (req, res) => {
  db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

    // QUESTION 2
// 2. Retrieve all providers
app.get('/providers', (req, res) => {
  db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

    // QUESTION 3
// 3. Filter patients by First Name
app.get('/patients/first-name/:firstName', (req, res) => {
  const { firstName } = req.params;
  db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

    // QUESTION 4
// 4. Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const { specialty } = req.params;
  db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

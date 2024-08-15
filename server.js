const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001
// an npm package that can give each note a unique ID

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// API route to GET all notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read notes data' });
      }
      res.json(JSON.parse(data));
    });
  });

// API route to SAVE a new note


// API route to DELETE a note - BONUS
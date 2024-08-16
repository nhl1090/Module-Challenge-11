const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const { v4: uuid } = require('uuid');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// HTML route for index.html

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

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

app.post('/api/notes', (req, res) => {
    const newNote = { id: uuid(), ...req.body };
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read notes data' });
      }
      
      const notes = JSON.parse(data);
      notes.push(newNote);
      
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to save note' });
        }
        res.json(newNote);
      });
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
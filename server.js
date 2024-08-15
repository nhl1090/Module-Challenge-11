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


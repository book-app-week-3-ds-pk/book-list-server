'use strict';

// Application dependencies

const express = require('express');
const pg = require('pg');
const cors = require('cors');

// Application Setup

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// console.log(PORT);
// console.log(CLIENT_URL);

// Database Setup

const client = new pg.Client(process.env.DATABASE_URL);
// console.log(client);
client.connect();
client.on('error', err => console.error(err));

// API Endpoints
app.use(cors());
app.get('/api/v1/books', (req, res) => {
  client.query(
  `SELECT book_id, title, author, image_url 
    FROM books;`)
  .then(results => res.send(results.rows))
  .catch(console.error);
});

app.get('/test', (req, res) => res.send('hello world'))
// This app.get will need a lot more fleshing out once the database is operational.

app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
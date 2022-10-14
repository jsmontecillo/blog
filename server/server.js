const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 2020;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});

// create the get request
app.get('/api/users', cors(), async (req, res) => {
  try {
    const { rows: users } = await db.query('SELECT * FROM users');
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

//new users
app.post('/api/users', cors(), async (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    image: req.body.image,
  };
  const result = await db.query(
    'INSERT INTO users(username, password, first_name, last_name, image) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [newUser.username, newUser.password, newUser.first_name, newUser.last_name, newUser.image],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

app.get('/api/posts', cors(), async (req, res) => {
  try {
    const { rows: blog_posts } = await db.query('SELECT * FROM blog_posts');
    res.send(blog_posts);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request for blog posts
app.post('/api/posts', cors(), async (req, res) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  console.log([newUser.firstname, newUser.lastname]);
  const result = await db.query(
    'INSERT INTO blog_posts(firstname, lastname) VALUES($1, $2) RETURNING *',
    [newUser.firstname, newUser.lastname],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

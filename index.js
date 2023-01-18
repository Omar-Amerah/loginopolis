const express = require('express');
const app = express();
const { User } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const bcrypt = require('bcrypt')
const SALT_COUNT =5

app.get('/', async (req, res, next) => {
  try {
    res.send('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// POST /register
// TODO - takes req.body of {username, password} and creates a new user with the hashed password

app.post('/register', async (req, res, next) => {
  try{
    console.log(req.body)
    const user = await req.body.username
    const pass = await req.body.password
    const hashedpass = await bcrypt.hash(pass, SALT_COUNT)
    User.create({username: user, password: hashedpass})
    res.sendStatus(200)
  }
 catch (error) {
  console.error(error);
  next(error)
}
})


// POST /login
// TODO - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB

app.post('/login', async (req, res, next) => {
  try{
    console.log(req.body)
    const user = await req.body.username
    const pass = await req.body.password
    User.findOne({where: { username: user, password: pass }})
    res.sendStatus(200)
  }
 catch (error) {
  console.error(error);
  next(error)
}
})


// we export the app, not listening in here, so that we can run tests
module.exports = app;

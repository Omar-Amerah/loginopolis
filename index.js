const express = require('express');
const app = express();
const { User, Book } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const bcrypt = require('bcrypt');

const SALT_COUNT =5

  Book.hasOne(User)
  User.belongsTo(Book)


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
    res.send(`successfully created user ${user}`).sendStatus(200)
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
    const userfound = await User.findOne({where: { username: user}})
    if(!userfound)
    {
      res.send(`User not found`)
      return
    }
    const isMatch = await bcrypt.compare(pass, userfound.password)
      if(!isMatch)
      {
        res.send('incorrect username or password').sendStatus(401)
        return
      }
      res.send(`successfully logged in user ${user}`).sendStatus(200)    
  }
 catch (error) {
  console.error(error);
  next(error)
}
})


app.get('/me', async (req, res, next) => {
  try{
    console.log(req.body)
    const user = await req.body.username
    const pass = await req.body.password
    const userfound = await User.findOne({where: { username: user}})
    if(!userfound)
    {
      res.send(`User not found`)
      return
    }
    const isMatch = await bcrypt.compare(pass, userfound.password)
      if(!isMatch)
      {
        res.send('incorrect username or password').sendStatus(401)
        return
      }
      const booktitle = await Book.findByPk(userfound.bookId)
      res.send(`${user}'s book: ${booktitle.title}`).sendStatus(200)    
  }
 catch (error) {
  console.error(error);
  next(error)
}
});


// we export the app, not listening in here, so that we can run tests
module.exports = app;

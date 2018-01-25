const express = require("express");
const bcrypt = require('bcrypt');

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY || 'dvelopment'],
}));

const database = require('./database');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const userId = req.session.userId;
  let user; 
  if (userId) {
    user = database.users[userId];
  }

  res.render('index', { user });
}); 

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Try and find the user with this email address
  let user;
  for (let userId in database.users) {
    const dbUser = database.users[userId];

    if (dbUser.email === email) {
      user = dbUser;
      break;
    }
  }

  // check the password
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      // logged in
      // send a cookie to the user 
      req.session.userId = user.userId;
      res.redirect('/');
    } else {
      res.status(401).send("💩");
    }
  } else {
    res.status(401).send("💩");
  }
  
});

app.listen(3000);
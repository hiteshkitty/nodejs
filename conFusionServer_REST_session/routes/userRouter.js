var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var User = require('../models/user');
const app = require('../app');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  console.log("signup... aa gaya...");
  User.findOne({ userName: req.body.userName })
    .then((user) => {
      console.log("user is already");
      if (user != null) {
        var err = new Error('User ' + req.body.userName + ' already exists!');
        err.status = 403;
        next(err);
      }
      else {
        console.log("create user...");
        return User.create({
          userName: req.body.userName,
          password: req.body.password,
          admin: req.body.admin
        });
      }
    })
    .then((user) => {
      console.log("everthing works...");
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'Registration Successful!', user: user });
    }, (err) => {
      console.log("before catch");
      console.log(err);
      next(err);
      
    })

    .catch((err) => {
      console.log("in catch");
      console.log(err);
      next(err);
    });
});

router.post('/login', (req, res, next) => {

  if (!req.session.user) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var userName = auth[0];
    var password = auth[1];

    User.findOne({ userName: userName })
      .then((user) => {
        if (user === null) {
          var err = new Error('User ' + userName + ' does not exist!');
          err.status = 403;
          return next(err);
        }
        else if (user.password !== password) {
          var err = new Error('Your password is incorrect!');
          err.status = 403;
          return next(err);
        }
        else if (user.userName === userName && user.password === password) {
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated!')
        }
      })
      .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = router;

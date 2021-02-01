const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { username, password, name, surname } = req.body;
  let errors = [];

  if (!username || !passport || !name || !surname) {

    errors.push({ msg: 'Please enter all fields' });
  }


  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      username,
      passport,
      name,
      surname
    });
  } else {
    User.findOne({ username: username }).then(user => {
      if (user) {
        errors.push({ msg: 'Username already exists' });
        res.render('register', {
          errors,
          username,
          password,
          name,
          surname
        });
      } else {
        const newUser = new User({
          username,
          password,
          name,
          surname
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              res.redirect('/users/login');
             
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/users/login',
    failureFlash: false
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
 
  res.redirect('/users/login');
});

module.exports = router;

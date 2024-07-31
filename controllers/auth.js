const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const router = express.Router();

// Rendering sign-up form
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

// Rendering sign-in form
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

// Logout route
router.get('/sign-out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Handle sign-up form submission
router.post('/sign-up', async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }

    // Check if the password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match');
    }

    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));
    req.body.password = hashedPassword;

    // Create the new user
    await User.create(req.body);

    res.redirect('/auth/sign-in');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Handle sign-in form submission
router.post('/sign-in', async (req, res) => {
  try {
    // Get the user from the database
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.');
    }

    // Validate the password
    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }

    // Create a session for the user
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;

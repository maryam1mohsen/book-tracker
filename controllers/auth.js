const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const router = express.Router();

// Register
router.get('/sign-up', (req, res, next) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res, next) => {
  const { username, email, password, confirmPassword, bio, profilePic } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      req.flash('error_msg', 'Username already exists');
      return res.redirect('/auth/sign-up');
    }

    if (password !== confirmPassword) {
      req.flash('error_msg', 'Passwords do not match');
      return res.redirect('/auth/sign-up');
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      bio,
      profilePic
    });
    
    await newUser.save();

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/auth/sign-in');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Something went wrong');
    res.redirect('/auth/sign-up');
  }
});

// Login
router.get('/sign-in', (req, res, next) => {
  res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      req.flash('error_msg', 'Invalid username or password');
      return res.redirect('/auth/sign-in');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash('error_msg', 'Invalid username or password');
      return res.redirect('/auth/sign-in');
    }

    req.session.user = {
      username: user.username,
      _id: user._id,
    };

    req.session.save(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Something went wrong');
    res.redirect('/auth/sign-in');
  }
});

// Logout
router.get('/sign-out', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;

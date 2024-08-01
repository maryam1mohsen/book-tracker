const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Show user profile
router.get('/:userId/profile', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('users/profile', { user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Render edit user profile form
router.get('/:userId/edit', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('users/edit.ejs', { user });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Update user profile
router.put('/:userId', isSignedIn, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, req.body);
    res.redirect(`/users/${req.params.userId}/profile`);
  } catch (error) {
    console.error(error);
    res.redirect(`/users/${req.params.userId}/edit`);
  }
});

module.exports = router;

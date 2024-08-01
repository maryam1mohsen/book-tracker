const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isSignedIn = require('../middleware/is-signed-in');

// Show user profile (protected)
router.get('/:userId/profile', isSignedIn, async (req, res) => {
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

// Render edit user profile form (protected)
router.get('/:userId/edit', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('users/edit', { user }); // Assuming you use `edit` instead of `edit.ejs`
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Update user profile (protected)
router.put('/:userId', isSignedIn, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.redirect(`/users/${req.params.userId}/profile`);
  } catch (error) {
    console.error(error);
    res.redirect(`/users/${req.params.userId}/edit`);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const List = require('../models/list');
const isSignedIn = require('../middleware/is-signed-in');

const VALID_STATUSES = ['To Read', 'Reading', 'Completed'];

// List all books in user's lists
router.get('/', isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id).populate('lists');
    const lists = currentUser.lists;

    res.render('lists/index.ejs', { lists });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Render new list form
router.get('/new', isSignedIn, async (req, res) => {
  res.render('lists/new.ejs', { statusOptions: VALID_STATUSES });
});

// Create new list
router.post('/', isSignedIn, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const newList = new List(req.body);

    currentUser.lists.push(newList);
    await newList.save();
    await currentUser.save();

    res.redirect(`/lists`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Show specific list
router.get('/:listId', isSignedIn, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id).populate('lists');
    const list = currentUser.lists.id(req.params.listId);

    res.render('lists/show.ejs', { list });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Delete specific list
router.delete('/:listId', isSignedIn, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const list = currentUser.lists.id(req.params.listId);

    list.deleteOne();
    await currentUser.save();

    res.redirect(`/lists`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Render edit list form
router.get('/:listId/edit', isSignedIn, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const list = currentUser.lists.id(req.params.listId);

    res.render('lists/edit.ejs', { list, statusOptions: VALID_STATUSES });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Update specific list
router.put('/:listId', isSignedIn, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const list = currentUser.lists.id(req.params.listId);

    list.set(req.body);
    await currentUser.save();

    res.redirect(`/lists/${req.params.listId}`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;

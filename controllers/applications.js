const express = require('express');
const Book = require('../models/book'); // Assuming the Book model is in ../models/book.js
const router = express.Router();

// Display all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('applications/index.ejs', { books });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Show form to create a new book
router.get('/new', (req, res) => {
  res.render('applications/new.ejs');
});

// Add a new book
router.post('/add', async (req, res) => {
  try {
    const { title, author, genre, description, coverImage } = req.body;
    const newBook = new Book({ title, author, genre, description, coverImage });
    await newBook.save();
    res.redirect('/applications');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Show a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('applications/show.ejs', { book });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Show form to edit a book
router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('applications/edit.ejs', { book });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a book
router.post('/:id/edit', async (req, res) => {
  try {
    const { title, author, genre, description, coverImage } = req.body;
    await Book.findByIdAndUpdate(req.params.id, { title, author, genre, description, coverImage });
    res.redirect(`/applications/${req.params.id}`);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a book
router.post('/:id/delete', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/applications');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

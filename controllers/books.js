const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user');
const List = require('../models/list');

// List all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.render('books/index.ejs', { books });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Render new book form
router.get('/new', async (req, res) => {
  res.render('books/new.ejs');
});

// // Create new book
// router.post('/', async (req, res) => {
//   try {
//     const book = new Book(req.body);
//     await book.save();
//     res.redirect('/books');
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// });

// Create new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, description, coverImageUrl } = req.body;
    const newBook = new Book({ title, author, genre, description, coverImageUrl });

    await newBook.save();

    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Show specific book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('books/show.ejs', { book });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Render edit book form
router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('books/edit.ejs', { book });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Update specific book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/books/${book._id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Delete specific book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;

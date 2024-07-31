const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
  status: {
    type: String,
    enum: ["to-read", "reading", "completed"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const List = mongoose.model('List', listSchema);

module.exports = List;

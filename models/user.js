const mongoose = require('mongoose');
// - _id (ObjectId)
// - username (String)
// - email (String)
// - password (String)
// - bio (String)
// - profilePic (String)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;


const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');

// Load environment variables from .env file
dotenv.config();

// Controller imports
const authCtrl = require('./controllers/auth');
const listCtrl = require('./controllers/lists');
const bookCtrl = require('./controllers/books');
const userCtrl = require('./controllers/users'); // Add this line

const app = express();

// Set the port from environment variable or default to 3001
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// Serve static files from the public directory
app.use(express.static('public'));

// Custom middleware
app.use(passUserToView);

// ROUTES
app.use('/auth', authCtrl);
app.use('/lists', listCtrl);
app.use('/books', bookCtrl);
app.use('/users', userCtrl);

app.get('/vip-lounge', isSignedIn, (req, res, next) => {
  res.send(`Welcome to the party ${req.session.user.username}.`);
});

app.get('/', (req, res, next) => {
  res.render('index.ejs');
});

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

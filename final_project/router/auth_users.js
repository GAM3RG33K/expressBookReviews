const express = require('express');
const jwt = require('jsonwebtoken');
const { getBookForISBN, addReviewForBook, deleteReviewFromBook } = require("./booksdb.js");
const regd_users = express.Router();
const { JWT_SECRET } = require('../config/config.js');
const { isEmpty } = require('./utils/common_utils.js');

let users = [];

const isValid = (username) => {
  const user = getUserFromUsername(username);
  return !isEmpty(user);
}

const authenticatedUser = (username, password) => {
  const isValidUser = isValid(username);

  if (!isValidUser) return null;
  const user = getUserFromUsername(username);
  if (isEmpty(user)) return null;
  const isValidPassword = user.password === password;
  return isValidUser && isValidPassword ? user : null;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const body = req.body;

  const username = body['username'];
  const password = body['password'];

  if (!username || !password) {
    return res.status(400).send("Username and Password are required.");
  }

  const user = authenticatedUser(username, password);
  if (isEmpty(user)) {
    return res.status(403).send("Invalid login credentials");
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: 60 * 60 });

  req.session.user = username;
  return res.status(200).json({ token, ...user });
});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(403).send(`Access denied, Please login & try again`);

  const isbn = req.params.isbn;
  const review = req.body.review;

  const book = await getBookForISBN(isbn);
  if (book) {
    addReviewForBook(isbn, user, review);
    return res.status(201).send(`Review added for book isbn: ${isbn} for user: ${user}`);
  } else {
    return res.status(404).send(`Unable to find book for isbn: ${isbn}`);
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", async (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(403).send(`Access denied, Please login & try again`);

  const isbn = req.params.isbn;

  const book = await getBookForISBN(isbn);
  if (book) {
    deleteReviewFromBook(isbn, user);
    return res.status(201).send(`Review deleted for book isbn: ${isbn} by user: ${user}`);
  } else {
    return res.status(404).send(`Unable to find book for isbn: ${isbn}`);
  }
});

function registerUser(user) {
  users.push(user);
};


function getUserFromUsername(username) {
  const existingUserIndex = users.findIndex((user) => user.username === username);
  if (existingUserIndex !== -1) {
    return users[existingUserIndex];
  } else {
    return null;
  }
};

module.exports = {
  users,
  isValid,
  customer_routes: regd_users,
  getUserFromUsername,
  registerUser
}

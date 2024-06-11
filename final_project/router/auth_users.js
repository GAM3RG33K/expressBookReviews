const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
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

  req.session.user = user;
  return res.status(200).json({ token, ...user });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
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

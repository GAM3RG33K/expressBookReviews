const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

function registerUser(user) {
  users.push(user);
};


function doesUserExist(username) {
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
  "authenticated": regd_users,
  doesUserExist,
  registerUser
}

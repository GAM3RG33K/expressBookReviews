const express = require('express');
const { getBooks, getBooksForAuthor, getBookForTitle, getBookForISBN, getReviewForBook } = require("./booksdb");
const { isValid, registerUser } = require("./auth_users.js");
const { isEmpty } = require("./utils/common_utils.js");
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and Password are required.");
  }

  const isValidUser = isValid(username);
  if (isValidUser) {
    return res.status(409).send("Username already exists.");
  }

  const newUser = { username, password };
  registerUser(newUser);

  return res.status(201).send(`New user ${username} registered successfully`);
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  const books = await getBooks();
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {

  const isbn = req.params.isbn;

  const book = await getBookForISBN(isbn);
  if (book) {
    return res.status(200).send(JSON.stringify(book, null, 4));
  } else {
    return res.status(404).send(`Unable to find book for isbn: ${isbn}`);
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  const authorBooks = getBooksForAuthor(author);
  if (authorBooks) {
    return res.status(200).send(JSON.stringify(authorBooks, null, 4));
  } else {
    return res.status(404).send(`Unable to find book(s) for author: ${author}`);
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;

  const book = getBookForTitle(title);
  if (book) {
    return res.status(200).send(JSON.stringify(book, null, 4));
  } else {
    return res.status(404).send(`Unable to find book(s) for title: ${title}`);
  }
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  const book = await getBookForISBN(isbn);
  if (book) {
    const reviews = getReviewForBook(book);
    if (!isEmpty(reviews)) {
      return res.status(200).send(JSON.stringify(reviews, null, 4));
    } else {
      return res.status(404).send(`No reviews yet, for book with isbn: ${isbn}`);
    }
  } else {
    return res.status(404).send(`Unable to find book for isbn: ${isbn}`);
  }
});

module.exports.general = public_users;

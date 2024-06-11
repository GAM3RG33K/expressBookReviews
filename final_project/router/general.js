const express = require('express');
const { books, getAllBookIsbns, getBooksForAuthor, getBookForTitle, getBookForISBN, getReviewForBook } = require("./booksdb");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  const book = getBookForISBN(isbn);
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
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  const book = getBookForISBN(isbn);
  if (book) {
    const reviews = getReviewForBook(book);
    if (reviews && reviews.length > 0) {
      return res.status(200).send(JSON.stringify(reviews, null, 4));
    } else {
      return res.status(404).send(`No reviews yet, for book with isbn: ${isbn}`);
    }
  } else {
    return res.status(404).send(`Unable to find book for isbn: ${isbn}`);
  }
});

module.exports.general = public_users;

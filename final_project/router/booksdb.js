let books = {
      1: { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
      2: { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
      3: { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
      4: { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
      5: { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
      6: { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
      7: { "author": "Unknown", "title": "Nj\u00e1l's Saga", "reviews": {} },
      8: { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
      9: { "author": "Honor\u00e9 de Balzac", "title": "Le P\u00e8re Goriot", "reviews": {} },
      10: { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

function getBooks() {
      let booksPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                  resolve(books)
            }, 5000)
      })
      return booksPromise;
}

function getAllBooks() {
      return Object.values(books);
};


function getBooksForAuthor(author) {

      const book = getAllBooks().filter((book) => book.author === author);
      if (book) {
            return book;
      } else {
            return null;
      }
};

function getBookForTitle(title) {
      const books = getAllBooks().filter((book) => book.title === title);
      if (books && books.length > 0) {
            return books[0];
      } else {
            return null;
      }
};

async function getBookForISBN(isbn) {
      let booksPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                  resolve(books[isbn])
            }, 5000)
      })
      const book = await booksPromise;
      if (book) {
            return book;
      } else {
            return null;
      }
};


function getReviewForBook(book) {
      if (book) {
            return book['reviews'];
      } else {
            return null;
      }
};


async function addReviewForBook(isbn, username, review) {
      const book = await getBookForISBN(isbn);
      book.reviews[username] = review;
};


async function deleteReviewFromBook(isbn, username, review) {
      const book = await getBookForISBN(isbn);
      delete book.reviews[username];
};

module.exports = { getBooks, getBooksForAuthor, getBookForTitle, getBookForISBN, getReviewForBook, addReviewForBook, deleteReviewFromBook };

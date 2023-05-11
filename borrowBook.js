const readLine = require("readline-sync");
const connection = require("./databaseConnection");
const redirectToMainMenu = require("./redirectToMainMenu");
const { showAllBooks } = require("./showBooks");

const checkCurrentIssuedBooks = (userId, callback) => {
  connection.query(
    `Select * from user_books where userId=${userId}`,
    (err, res, fields) => {
      try {
        if (err) throw err;
        else {
          callback(
            userId,
            res.map(({ bookId }) => bookId)
          );
        }
      } catch (err) {
        callback([]);
      }
    }
  );
};

const checkIfUserExists = (userId, callback) => {
  connection.query("Select * from users", (err, res, fields) => {
    try {
      if (err) throw err;
      else {
        if (res.find(({ id }) => id == userId)) callback(userId);
        else callback(false);
      }
    } catch (err) {
      callback(false);
    }
  });
};

const markEntryForUser = (userId, bookId) => {
  console.log("mak user", userId, bookId);

  connection.query(
    `Insert into user_books(userId,bookId) values(${userId}, ${bookId})`,
    (err, res, fields) => {
      try {
        if (err) throw err;
        else {
          console.log("Book Issued");
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  );
};

const issueBook = (userId, bookId, bookCount) => {
  console.log("isse book");
  connection.query(
    `update books set count=${bookCount - 1} where id=${bookId}`,
    (err, res, fields) => {
      try {
        if (err) throw err;
        else {
          markEntryForUser(userId, bookId);
        }
      } catch (err) {
        console.log("err on books table", err);
      }
    }
  );
};

const proceedWithBookSelection = (userId, alreadyIssuedBooks) => {
  const borrowFunction = (books) => {
    const bookId = readLine.question("Please enter Book id:");
    const book = books.find(({ id }) => id == bookId);
    if (book) {
      console.log("Boook is available");
      if (alreadyIssuedBooks.includes(Number(bookId))) {
        console.log("You have already issued this book");
      } else if (book.count == 0) {
        console.log("Currently unavailable");
      } else {
        // Issue the book.
        issueBook(userId, bookId, book.count);
      }
    } else {
      console.log("Book is not available currently.");
      borrowFunction(bookIds);
    }
  };
  console.log("proceedWithBookSelection", alreadyIssuedBooks);
  if (alreadyIssuedBooks.length == 2) {
    console.log("You have already issued 2 books.");
    // todo returun to main menu.
  } else {
    showAllBooks(borrowFunction);
  }
};

const borrowMethod = (userId) => {
  console.log("borrow", userId);
  if (userId) {
    console.log("User exists");
    checkCurrentIssuedBooks(userId, proceedWithBookSelection);
  } else {
    console.log("User doesn't exists. Redirecting to main menu.");
    redirectToMainMenu();
  }
};

const borrowBook = async () => {
  const userId = readLine.question("Please enter User id:");
  checkIfUserExists(Number(userId), borrowMethod);
};

module.exports = borrowBook;

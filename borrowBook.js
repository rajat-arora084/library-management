const readLine = require("readline-sync");
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
	console.log("check user existence",userId);
  connection.query("Select * from users", (err, res, fields) => {
    try {
      if (err) throw err;
      else {
        const userExists = res.find(({ id }) => id == userId);
        console.log("User exists");
        if (userExists) {
          callback(userId);
        } else {
          callback(false);
        }
      }
    } catch (err) {
		console.log("error")
      callback(false);
    }
  });
};

const markEntryForUser = (userId, bookId) => {
  connection.query(
    `Insert into user_books(userId,bookId) values(${userId}, ${bookId})`,
    (err, res, fields) => {
      try {
        if (err) throw err;
        else {
          console.log("Book Issued");
        }
      } catch (err) {
        console.log("Some error occured while adding book to user");
      } finally {
        redirectToMainMenu();
      }
    }
  );
};

const issueBook = (userId, bookId, bookCount) => {
  console.log("Issuing book");
  connection.query(
    `update books set count=${bookCount - 1} where id=${bookId}`,
    (err, res, fields) => {
      try {
        if (err) throw err;
        else {
          markEntryForUser(userId, bookId);
        }
      } catch (err) {
        console.log("Some error occured while issuing book");
      } finally {
        redirectToMainMenu();
      }
    }
  );
};

const proceedWithBookSelection = (userId, alreadyIssuedBooks) => {
  const borrowFunction = (books) => {
    const bookId = readLine.question("Please enter Book id:");
    const book = books.find(({ id }) => id == bookId);
    if (book) {
      if (alreadyIssuedBooks.includes(Number(bookId))) {
        console.log("You have already issued this book");
		borrowFunction(books);
      } else if (book.count == 0) {
        console.log("Book is not available currently. Book count 0");
        borrowFunction(books);
      } else {
        // Issue the book.
        issueBook(userId, bookId, book.count);
      }
    } else {
      console.log("Book is not available in library.");
      borrowFunction(books);
    }
  };
  if (alreadyIssuedBooks.length == 2) {
    console.log("You have already issued 2 books.", alreadyIssuedBooks);
    redirectToMainMenu();
  } else {
    showAllBooks(borrowFunction);
  }
};

const borrowMethod = (userId) => {
  if (userId) {
    console.log(`User ${userId} exists....Proceeding with Books catalogue...`);
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

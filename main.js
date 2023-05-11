const readLine = require("readline-sync");
const showAllBooks = require("./showBooks");

const mainMenu = () => {
  console.log("*****************MAIN MENU************************");
  console.log("1. View books");
  console.log("2. Borrow a book");
  console.log("3. Borrow a copy");
  console.log("4. Return a book");

  const option = Number(readLine.question("Choose an option from above menu:"));

  switch (option) {
    case 1: {
      showAllBooks();
      return;
    }
    case 2: {
      return;
    }
    case 3: {
      return;
    }
    case 4: {
      return;
    }
    default: {
      console.log("Wrong choice");
    }
  }
};

module.exports = mainMenu;

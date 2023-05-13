const readLine = require("readline-sync");
const { main } = require(".");
const redirectToMainMenu = require("./redirectToMainMenu");

const promptForMainMenu = () => {
  const key = readLine.question("Redirect to Main menu-- Press any key.");
  if (key) {
    redirectToMainMenu();
  }
};

const showAllBooks = (callback) => {
  console.log("***********All Books*********************");
  console.log("Id \t Name \t \t Remaining Count");
  connection.query("Select * from books", (err, res, fields) => {
    try {
      if (err) throw err;
      else {
        res.map(({ id, name, count }) =>
          console.log(id, "\t", name, "\t\t\t", count)
        );
        callback?.(res);
      }
    } catch (err) {
      console.log("Some error occured while fetching Books data");
      callback?.([]);
    } finally {
      console.log("*****************************************");
    }
  });
};

const showBooks = () => {
  showAllBooks(promptForMainMenu);
};

module.exports = {
  showAllBooks,
  showBooks,
};

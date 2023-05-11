const mainMenu = require("./main");
const main = require("./main");

const redirectToMainMenu = () => {
  console.log("Redirecting to main menu in 3 seconds");
  console.log("Clearing Console");

  setTimeout(() => {
    console.clear();
    mainMenu();
  }, 2000);
};

module.exports = redirectToMainMenu;

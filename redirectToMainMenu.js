const redirectToMainMenu = () => {
  console.log("Redirecting to main menu in 2 seconds");
  console.log("Clearing Console");

  setTimeout(() => {
    //console.clear();
    const { mainMenu } = require("./main");
    mainMenu();
  }, 2000);
};

module.exports = redirectToMainMenu;

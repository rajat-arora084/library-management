const mysql = require("mysql");
const dbConfig = require("./dbConfig.json");

const { host, user, password, database, port } = dbConfig;

globalThis.connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
});

connection.connect(function (err) {
  if (err) console.log("error", err);
});

